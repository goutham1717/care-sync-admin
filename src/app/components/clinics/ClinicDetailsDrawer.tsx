import { GetClinicsQuery } from '@/gql/graphql';
import {
  Drawer,
  IconButton,
  Typography,
} from "@material-tailwind/react";

type Props = {
  clinic: GetClinicsQuery['getClinics'][0];
  open: boolean;
  onClose: () => void;
}

const ClinicDetailsDrawer = ({ clinic, open, onClose }: Props) => {
  return (
    <Drawer
      size={1000}
      open={open}
      onClose={onClose}
      className="p-4"
      placeholder={undefined}
      onPointerEnterCapture={undefined}
      onPointerLeaveCapture={undefined}
    >
      <div className="mb-6 flex items-center justify-between">
        <Typography
          variant="h5"
          color="blue-gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Clinic Details
        </Typography>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={onClose}
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-5 w-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </IconButton>
      </div>
      <div className="space-y-6">
        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Basic Information
          </Typography>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Name
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {clinic.name}
              </Typography>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                About
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {clinic.about}
              </Typography>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Email
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {clinic.email}
              </Typography>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Business Hours
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {clinic.openTime} - {clinic.closeTime}
              </Typography>
            </div>
          </div>
        </div>

        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Address
          </Typography>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Line 1
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {clinic.address.line1}
              </Typography>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Line 2
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {clinic.address.line2}
              </Typography>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                City
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {clinic.address.city}
              </Typography>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                State
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {clinic.address.state}
              </Typography>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Country
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {clinic.address.country}
              </Typography>
            </div>
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-semibold"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                PIN
              </Typography>
              <Typography
                variant="small"
                color="blue-gray"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                {clinic.address.pin}
              </Typography>
            </div>
          </div>
        </div>

        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Contact Information
          </Typography>
          <div className="grid grid-cols-2 gap-4">
            {clinic.phone_number.map((phone, index) => (
              <div key={index}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-semibold"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {phone.name}
                </Typography>
                <Typography
                  variant="small"
                  color="blue-gray"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {phone.n}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        <div>
          <Typography
            variant="h6"
            color="blue-gray"
            className="mb-2"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Working Days
          </Typography>
          <div className="flex gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div
                key={day}
                className={`p-2 rounded ${clinic.workingDays[index]
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                  }`}
              >
                <Typography
                  variant="small"
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  {day}
                </Typography>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default ClinicDetailsDrawer; 