'use client';

import { ApolloProvider, useMutation, useQuery } from '@apollo/client';
import { Button, Card, CardBody, CardHeader, Spinner, Switch, Typography } from '@material-tailwind/react';
import { client } from '@/lib/apolloclient';
import { CREATE_INVENTORY_LOGIN, UPDATE_INVENTORY_LOGIN_STATUS } from '@/graphql/mutation/inventoryLogins';
import { GET_INVENTORY_LOGINS } from '@/graphql/query/inventoryLogins';
import { FormEvent, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SafeButton = Button as any;
const SafeCard = Card as any;
const SafeCardBody = CardBody as any;
const SafeCardHeader = CardHeader as any;
const SafeSpinner = Spinner as any;
const SafeSwitch = Switch as any;
const SafeTypography = Typography as any;

type InventoryLogin = {
  id: string;
  username: string;
  clinicName: string;
  isActive: boolean;
  mustChangePassword: boolean;
  createdAt: string;
};

const InventoryLoginList = ({ clinicId }: { clinicId: string }) => {
  const { data, loading, error, refetch } = useQuery(GET_INVENTORY_LOGINS, {
    variables: { clinicId },
  });
  const [createLogin, { loading: creating }] = useMutation(CREATE_INVENTORY_LOGIN);
  const [updateStatus] = useMutation(UPDATE_INVENTORY_LOGIN_STATUS);
  const [showCreate, setShowCreate] = useState(false);
  const [username, setUsername] = useState('');
  const [temporaryPassword, setTemporaryPassword] = useState('');
  const [createdCredentials, setCreatedCredentials] = useState<{ username: string; password: string } | null>(null);

  const generatePassword = () => {
    const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
    const bytes = new Uint32Array(14);
    crypto.getRandomValues(bytes);
    setTemporaryPassword(Array.from(bytes, (value) => alphabet[value % alphabet.length]).join(''));
  };

  const handleCreate = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await createLogin({
        variables: { input: { clinicId, username, temporaryPassword } },
      });
      setCreatedCredentials({ username: username.trim().toLowerCase(), password: temporaryPassword });
      setUsername('');
      setTemporaryPassword('');
      setShowCreate(false);
      await refetch();
      toast.success('Inventory login created');
    } catch (createError: any) {
      toast.error(createError?.message || 'Unable to create inventory login');
    }
  };

  const handleStatusChange = async (login: InventoryLogin) => {
    try {
      await updateStatus({ variables: { input: { id: login.id, isActive: !login.isActive } } });
      await refetch();
      toast.success(`Login ${login.isActive ? 'deactivated' : 'activated'}`);
    } catch (statusError: any) {
      toast.error(statusError?.message || 'Unable to update login');
    }
  };

  const copyCredentials = async () => {
    if (!createdCredentials) return;
    await navigator.clipboard.writeText(
      `Username: ${createdCredentials.username}\nTemporary password: ${createdCredentials.password}`,
    );
    toast.success('Credentials copied');
  };

  if (loading) {
    return <div className="flex h-96 items-center justify-center"><SafeSpinner className="h-12 w-12" /></div>;
  }

  if (error) {
    return <div className="p-4 text-red-600">Error loading inventory logins: {error.message}</div>;
  }

  const logins = (data?.getInventoryLogins ?? []) as InventoryLogin[];

  return (
    <SafeCard className="h-full w-full">
      <SafeCardHeader floated={false} shadow={false} className="flex items-start justify-between rounded-none">
        <div>
          <SafeTypography variant="h4" color="blue-gray">Inventory logins</SafeTypography>
          <SafeTypography color="gray" className="mt-1 font-normal">
            Create clinic credentials for pharmacists and control whether they can sign in.
          </SafeTypography>
        </div>
        <SafeButton color="black" size="sm" onClick={() => setShowCreate((value) => !value)}>
          {showCreate ? 'Cancel' : 'Create login'}
        </SafeButton>
      </SafeCardHeader>

      <SafeCardBody>
        {showCreate && (
          <form onSubmit={handleCreate} className="mb-6 grid gap-4 rounded-lg border border-blue-gray-100 bg-blue-gray-50/40 p-5 md:grid-cols-2">
            <label className="text-sm font-medium text-blue-gray-800">
              Username
              <input
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                pattern="[A-Za-z0-9._-]+"
                minLength={3}
                required
                className="mt-2 w-full rounded-md border border-blue-gray-200 bg-white px-3 py-2 outline-none focus:border-blue-500"
                placeholder="clinic-pharmacy"
              />
            </label>
            <label className="text-sm font-medium text-blue-gray-800">
              Temporary password
              <div className="mt-2 flex gap-2">
                <input
                  type="text"
                  value={temporaryPassword}
                  onChange={(event) => setTemporaryPassword(event.target.value)}
                  minLength={8}
                  required
                  className="w-full rounded-md border border-blue-gray-200 bg-white px-3 py-2 outline-none focus:border-blue-500"
                />
                <SafeButton type="button" variant="outlined" size="sm" onClick={generatePassword}>Generate</SafeButton>
              </div>
            </label>
            <div className="md:col-span-2 flex justify-end">
              <SafeButton type="submit" color="blue" disabled={creating}>
                {creating ? 'Creating…' : 'Create inventory login'}
              </SafeButton>
            </div>
          </form>
        )}

        {createdCredentials && (
          <div className="mb-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
            <div className="font-semibold">Share these temporary credentials now</div>
            <div className="mt-2 font-mono">Username: {createdCredentials.username}</div>
            <div className="font-mono">Password: {createdCredentials.password}</div>
            <p className="mt-2 text-amber-800">The password is not stored in readable form and the pharmacist must replace it on first sign-in.</p>
            <SafeButton className="mt-3" size="sm" variant="outlined" onClick={copyCredentials}>Copy credentials</SafeButton>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {['Username', 'Clinic', 'Password status', 'Created', 'Access'].map((heading) => (
                  <th key={heading} className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-sm font-semibold text-blue-gray-700">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {logins.map((login) => (
                <tr key={login.id} className="even:bg-blue-gray-50/50">
                  <td className="p-4 font-medium text-blue-gray-900">{login.username}</td>
                  <td className="p-4 text-sm text-blue-gray-700">{login.clinicName}</td>
                  <td className="p-4 text-sm">
                    <span className={login.mustChangePassword ? 'text-amber-700' : 'text-green-700'}>
                      {login.mustChangePassword ? 'Temporary' : 'Updated'}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-blue-gray-700">{new Date(login.createdAt).toLocaleDateString()}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <SafeSwitch checked={login.isActive} onChange={() => handleStatusChange(login)} />
                      <span className={login.isActive ? 'text-green-700' : 'text-red-600'}>{login.isActive ? 'Active' : 'Inactive'}</span>
                    </div>
                  </td>
                </tr>
              ))}
              {logins.length === 0 && (
                <tr><td colSpan={5} className="p-8 text-center text-gray-600">No inventory logins have been created for this clinic.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </SafeCardBody>
      <ToastContainer />
    </SafeCard>
  );
};

export default function InventoryLoginsPage({ params }: { params: { clinicId: string } }) {
  return (
    <ApolloProvider client={client}>
      <InventoryLoginList clinicId={params.clinicId} />
    </ApolloProvider>
  );
}
