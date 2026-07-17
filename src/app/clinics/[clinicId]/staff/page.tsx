'use client';

import { GET_CLINIC_STAFF } from "@/graphql/query/staff";
import { ADD_CLINIC_STAFF, UPDATE_CLINIC_STAFF, REMOVE_CLINIC_STAFF } from "@/graphql/mutation/staff";
import { GET_CLINIC_MODULE_ACCESS } from "@/graphql/query/clinicModuleSubscriptions";
import { useQuery, useMutation } from "@apollo/client";
import { Typography, Card, CardHeader, CardBody, Spinner, Button, Dialog, Switch } from "@material-tailwind/react";
import { ApolloProvider } from "@apollo/client";
import { client } from "@/lib/apolloclient";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type StaffMember = {
  id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  staffRole: string;
  permissions: string[];
  clinicId: string;
  isActive: boolean;
  createdAt: string;
};

type Props = {
  params: {
    clinicId: string;
  };
};

type AddStaffFormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  staffRole: string;
};

type EditStaffFormValues = {
  firstName: string;
  lastName: string;
  phoneNumber: string;
};

const ALL_PERMISSIONS = [
  "APPOINTMENTS_VIEW",
  "APPOINTMENTS_CREATE",
  "APPOINTMENTS_UPDATE",
  "APPOINTMENTS_ANALYTICS",
  "PATIENTS_VIEW",
  "PATIENTS_CREATE",
  "PATIENTS_UPDATE",
  "PRESCRIPTIONS_VIEW",
  "PRESCRIPTIONS_CREATE",
  "INVENTORY_VIEW",
  "INVENTORY_CREATE",
  "INVENTORY_UPDATE",
  "INVENTORY_DELETE",
  "INVENTORY_STOCK_MANAGE",
  "INVENTORY_DISPENSE",
  "INVENTORY_TRANSACTION_CREATE",
  "INVENTORY_PURCHASE_CREATE",
  "ANALYTICS_VIEW",
  "REPORTS_VIEW",
  "REPORTS_GENERATE",
  "BILLING_VIEW",
  "BILLING_UPDATE",
  "STAFF_MANAGE",
  "SETTINGS_VIEW",
  "SETTINGS_UPDATE",
  "DOCUMENTS_VIEW",
  "DOCUMENTS_UPLOAD",
  "DOCUMENTS_DELETE",
  "CHECKIN_WRITE",
  "CHECKIN_READ",
  "MESSAGING_VIEW",
  "MESSAGING_SEND",
  "MESSAGING_DELETE",
  "MESSAGING_TOGGLE_MODE",
  "INTEGRATIONS_MANAGE",
  "KNOWLEDGE_BASE_MANAGE",
  "INPATIENT_VIEW",
  "INPATIENT_ADMIT",
  "INPATIENT_BEDS_MANAGE",
  "INPATIENT_CLINICAL_WRITE",
  "INPATIENT_ORDERS_MANAGE",
  "INPATIENT_MAR_MANAGE",
  "INPATIENT_TRANSFER",
  "INPATIENT_DISCHARGE",
  "INPATIENT_BILLING_VIEW",
  "INPATIENT_BILLING_UPDATE"
];

const INPATIENT_PERMISSIONS = [
  "INPATIENT_VIEW",
  "INPATIENT_ADMIT",
  "INPATIENT_BEDS_MANAGE",
  "INPATIENT_CLINICAL_WRITE",
  "INPATIENT_ORDERS_MANAGE",
  "INPATIENT_MAR_MANAGE",
  "INPATIENT_TRANSFER",
  "INPATIENT_DISCHARGE",
  "INPATIENT_BILLING_VIEW",
  "INPATIENT_BILLING_UPDATE",
];

const INPATIENT_ACCESS_LEVELS = [
  { label: "None", permissions: [] },
  { label: "Read", permissions: ["INPATIENT_VIEW"] },
  {
    label: "Admin",
    permissions: [
      "INPATIENT_VIEW",
      "INPATIENT_ADMIT",
      "INPATIENT_BEDS_MANAGE",
      "INPATIENT_TRANSFER",
      "INPATIENT_DISCHARGE",
    ],
  },
  {
    label: "Clinical",
    permissions: [
      "INPATIENT_VIEW",
      "INPATIENT_CLINICAL_WRITE",
      "INPATIENT_ORDERS_MANAGE",
      "INPATIENT_MAR_MANAGE",
    ],
  },
  {
    label: "Billing",
    permissions: [
      "INPATIENT_VIEW",
      "INPATIENT_BILLING_VIEW",
      "INPATIENT_BILLING_UPDATE",
    ],
  },
  { label: "Full", permissions: INPATIENT_PERMISSIONS },
];

const StaffList = ({ clinicId }: { clinicId: string }) => {
  const { data, loading, error, refetch } = useQuery(GET_CLINIC_STAFF, {
    variables: { clinicId },
  });
  const { data: inpatientAccessData } = useQuery(GET_CLINIC_MODULE_ACCESS, {
    variables: { clinicId, moduleKey: "Inpatient" },
  });
  const hasInpatientAccess = Boolean(inpatientAccessData?.getClinicModuleAccess?.enabled);
  const visiblePermissions = hasInpatientAccess
    ? ALL_PERMISSIONS
    : ALL_PERMISSIONS.filter((permission) => !INPATIENT_PERMISSIONS.includes(permission));

  const [addClinicStaff] = useMutation(ADD_CLINIC_STAFF);
  const [updateClinicStaff] = useMutation(UPDATE_CLINIC_STAFF);
  const [removeClinicStaff] = useMutation(REMOVE_CLINIC_STAFF);

  // Add staff dialog
  const [addOpen, setAddOpen] = useState(false);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  // Edit staff dialog
  const [editOpen, setEditOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [editPermissions, setEditPermissions] = useState<string[]>([]);

  // Remove confirm dialog
  const [removeOpen, setRemoveOpen] = useState(false);
  const [removingStaff, setRemovingStaff] = useState<StaffMember | null>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<AddStaffFormValues>({
    defaultValues: { staffRole: "STAFF" },
  });

  const {
    register: registerEdit,
    handleSubmit: handleEditSubmit,
    reset: resetEdit,
    formState: { errors: editErrors },
  } = useForm<EditStaffFormValues>();

  const togglePermission = (perm: string, current: string[], setter: (p: string[]) => void) => {
    if (current.includes(perm)) {
      setter(current.filter((p) => p !== perm));
    } else {
      setter([...current, perm]);
    }
  };

  const normalizePermissions = (permissions: string[]) => (
    hasInpatientAccess
      ? permissions
      : permissions.filter((permission) => !INPATIENT_PERMISSIONS.includes(permission))
  );

  const applyInpatientAccessLevel = (
    permissions: string[],
    levelPermissions: string[],
    setter: (p: string[]) => void,
  ) => {
    const withoutInpatient = permissions.filter(
      (permission) => !INPATIENT_PERMISSIONS.includes(permission),
    );
    setter([...withoutInpatient, ...levelPermissions]);
  };

  const handleAddStaff = async (formData: AddStaffFormValues) => {
    try {
      await addClinicStaff({
        variables: {
          input: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: `${formData.phoneNumber}`,
            staffRole: formData.staffRole,
            clinicId,
            ...(selectedPermissions.length > 0 && {
              permissions: normalizePermissions(selectedPermissions),
            }),
          },
        },
      });
      toast.success("Staff member added successfully!");
      setAddOpen(false);
      reset({ staffRole: "STAFF" });
      setSelectedPermissions([]);
      refetch();
    } catch (err) {
      console.error("Error adding staff:", err);
      toast.error("Failed to add staff member");
    }
  };

  const handleUpdateStaff = async (formData: EditStaffFormValues) => {
    if (!editingStaff) return;
    try {
      await updateClinicStaff({
        variables: {
          input: {
            staffId: editingStaff.id,
            firstName: formData.firstName,
            lastName: formData.lastName,
            phoneNumber: `${formData.phoneNumber}`,
            permissions: normalizePermissions(editPermissions),
          },
        },
      });
      toast.success("Staff member updated!");
      setEditOpen(false);
      setEditingStaff(null);
      refetch();
    } catch (err) {
      console.error("Error updating staff:", err);
      toast.error("Failed to update staff member");
    }
  };

  const handleRemove = async () => {
    if (!removingStaff) return;
    try {
      await removeClinicStaff({
        variables: {
          staffId: removingStaff.id,
          clinicId,
        },
      });
      toast.success("Staff member removed!");
      setRemoveOpen(false);
      setRemovingStaff(null);
      refetch();
    } catch (err) {
      console.error("Error removing staff:", err);
      toast.error("Failed to remove staff member");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Spinner
          className="h-12 w-12"
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <Typography
          color="red"
          variant="h6"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Error loading staff: {error.message}
        </Typography>
      </div>
    );
  }

  return (
    <Card
      className="h-full w-full"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <CardHeader
        floated={false}
        shadow={false}
        className="rounded-none flex justify-between items-center"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div>
          <Typography
            variant="h4"
            color="blue-gray"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Clinic Staff
          </Typography>
          <Typography
            color="gray"
            className="mt-1 font-normal"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Manage staff members and their permissions
          </Typography>
        </div>
        <Button
          color="black"
          size="sm"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
          onClick={() => {
            reset({ staffRole: "STAFF" });
            setSelectedPermissions([]);
            setAddOpen(true);
          }}
        >
          Add Staff
        </Button>
      </CardHeader>

      {/* Add Staff Dialog */}
      <Dialog
        open={addOpen}
        handler={() => setAddOpen(!addOpen)}
        size="lg"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="p-8">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-6"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Add Staff Member
          </Typography>
          <form onSubmit={handleSubmit(handleAddStaff)}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  {...register("firstName", { required: "First name is required" })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="First name"
                />
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  {...register("lastName", { required: "Last name is required" })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Last name"
                />
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  {...register("phoneNumber", { required: "Phone number is required" })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone number"
                />
                {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Staff Role</label>
                <input
                  {...register("staffRole")}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Role"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permissions <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              {hasInpatientAccess && (
                <div className="mb-3 rounded-md border border-blue-100 bg-blue-50 p-3">
                  <div className="mb-2 text-xs font-semibold text-blue-900">Inpatient Access Level</div>
                  <div className="flex flex-wrap gap-2">
                    {INPATIENT_ACCESS_LEVELS.map((level) => (
                      <button
                        key={`add-${level.label}`}
                        type="button"
                        onClick={() => applyInpatientAccessLevel(
                          selectedPermissions,
                          level.permissions,
                          setSelectedPermissions,
                        )}
                        className="rounded border border-blue-200 bg-white px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3">
                {visiblePermissions.map((perm) => (
                  <label key={perm} className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedPermissions.includes(perm)}
                      onChange={() => togglePermission(perm, selectedPermissions, setSelectedPermissions)}
                      className="rounded"
                    />
                    {perm}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                color="gray"
                variant="outlined"
                onClick={() => setAddOpen(false)}
                type="button"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Cancel
              </Button>
              <Button
                color="blue"
                type="submit"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Add Staff
              </Button>
            </div>
          </form>
        </div>
      </Dialog>

      {/* Edit Staff Dialog */}
      <Dialog
        open={editOpen}
        handler={() => setEditOpen(!editOpen)}
        size="lg"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="p-8">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-6"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Edit Staff Member
          </Typography>
          <form onSubmit={handleEditSubmit(handleUpdateStaff)}>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                <input
                  {...registerEdit("firstName", { required: "First name is required" })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="First name"
                />
                {editErrors.firstName && <p className="text-red-500 text-xs mt-1">{editErrors.firstName.message}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                <input
                  {...registerEdit("lastName", { required: "Last name is required" })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Last name"
                />
                {editErrors.lastName && <p className="text-red-500 text-xs mt-1">{editErrors.lastName.message}</p>}
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  {...registerEdit("phoneNumber", { required: "Phone number is required" })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Phone number"
                />
                {editErrors.phoneNumber && <p className="text-red-500 text-xs mt-1">{editErrors.phoneNumber.message}</p>}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
              {hasInpatientAccess && (
                <div className="mb-3 rounded-md border border-blue-100 bg-blue-50 p-3">
                  <div className="mb-2 text-xs font-semibold text-blue-900">Inpatient Access Level</div>
                  <div className="flex flex-wrap gap-2">
                    {INPATIENT_ACCESS_LEVELS.map((level) => (
                      <button
                        key={`edit-${level.label}`}
                        type="button"
                        onClick={() => applyInpatientAccessLevel(
                          editPermissions,
                          level.permissions,
                          setEditPermissions,
                        )}
                        className="rounded border border-blue-200 bg-white px-2 py-1 text-xs font-medium text-blue-700 hover:bg-blue-100"
                      >
                        {level.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-md p-3">
                {visiblePermissions.map((perm) => (
                  <label key={perm} className="flex items-center gap-2 cursor-pointer text-xs text-gray-700">
                    <input
                      type="checkbox"
                      checked={editPermissions.includes(perm)}
                      onChange={() => togglePermission(perm, editPermissions, setEditPermissions)}
                      className="rounded"
                    />
                    {perm}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button
                color="gray"
                variant="outlined"
                onClick={() => setEditOpen(false)}
                type="button"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Cancel
              </Button>
              <Button
                color="blue"
                type="submit"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </Dialog>

      {/* Remove Confirm Dialog */}
      <Dialog
        open={removeOpen}
        handler={() => setRemoveOpen(!removeOpen)}
        size="sm"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <div className="p-8">
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Remove Staff Member
          </Typography>
          <Typography
            color="gray"
            className="mb-6 text-sm"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Are you sure you want to remove {removingStaff?.firstName} {removingStaff?.lastName}? This action cannot be undone.
          </Typography>
          <div className="flex justify-end gap-3">
            <Button
              color="gray"
              variant="outlined"
              onClick={() => setRemoveOpen(false)}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Cancel
            </Button>
            <Button
              color="red"
              onClick={handleRemove}
              placeholder={undefined}
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
            >
              Remove
            </Button>
          </div>
        </div>
      </Dialog>

      <CardBody
        className="overflow-scroll px-0"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {["Name", "Role", "Phone", "Permissions", "Status", "Actions"].map((head) => (
                <th
                  key={head}
                  className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data?.getClinicStaff.map((staff: StaffMember) => (
              <tr key={staff.id} className="even:bg-blue-gray-50/50">
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {staff.firstName} {staff.lastName}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {staff.staffRole}
                  </Typography>
                </td>
                <td className="p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    {staff.phoneNumber}
                  </Typography>
                </td>
                <td className="p-4">
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {staff.permissions?.length ?? 0} permissions
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={staff.isActive}
                      color="green"
                      ripple={false}
                      disabled
                      className="h-full w-full checked:bg-green-500"
                      crossOrigin={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    />
                    <Typography
                      variant="small"
                      color={staff.isActive ? "green" : "red"}
                      className="font-normal"
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {staff.isActive ? "Active" : "Inactive"}
                    </Typography>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => {
                        setEditingStaff(staff);
                        setEditPermissions(staff.permissions ?? []);
                        resetEdit({
                          firstName: staff.firstName,
                          lastName: staff.lastName,
                          phoneNumber: staff.phoneNumber,
                        });
                        setEditOpen(true);
                      }}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setRemovingStaff(staff);
                        setRemoveOpen(true);
                      }}
                      className="text-red-500 hover:text-red-700 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {(!data?.getClinicStaff || data.getClinicStaff.length === 0) && (
              <tr>
                <td colSpan={6} className="p-8 text-center">
                  <Typography
                    color="gray"
                    className="font-normal"
                    placeholder={undefined}
                    onPointerEnterCapture={undefined}
                    onPointerLeaveCapture={undefined}
                  >
                    No staff members found. Add your first staff member.
                  </Typography>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </CardBody>
      <ToastContainer />
    </Card>
  );
};

const ClinicStaffPage = ({ params }: Props) => {
  return (
    <ApolloProvider client={client}>
      <StaffList clinicId={params.clinicId} />
    </ApolloProvider>
  );
};

export default ClinicStaffPage;
