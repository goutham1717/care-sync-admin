import { gql } from "@apollo/client";

export const GET_CLINIC_ADMIN_DASHBOARD = gql`
  query GetClinicAdminDashboard($clinicId: String!) {
    getClinicAdminDashboard(clinicId: $clinicId) {
      clinic {
        id
        name
        city_name
        email
        openTime
        closeTime
        logoUrl
        ownerDoctorId
        ownerDoctorName
      }
      totalDoctors
      activeDoctors
      totalStaff
      activeStaff
      totalPatients
      totalAppointments
      appointmentsThisMonth
      aiAppointmentsThisMonth
      totalBillings
      paidBillings
      pendingBillings
      revenueCollected
      outstandingAmount
      walletBalanceInr
      smsCredits
      whatsappCredits
      videoCredits
      callCredits
      activeMilestones
      achievedMilestones
      activeModules
      moduleSubscriptions {
        moduleKey
        status
        startDate
        endDate
      }
      recentDoctors {
        doctorId
        fullName
        designation
        speciality
        isActive
      }
      recentMilestones {
        achievementId
        milestoneId
        title
        rewardType
        rewardValue
        status
        progressValue
        targetValue
        achievedAt
      }
      recentAppointments {
        appointmentId
        patientName
        patientMobile
        serviceType
        startTime
        status
        creationSource
        paymentStatus
      }
    }
  }
`;

export const GET_DOCTOR_ADMIN_DASHBOARD = gql`
  query GetDoctorAdminDashboard($doctorId: String!) {
    getDoctorAdminDashboard(doctorId: $doctorId) {
      doctor {
        doctorId
        fullName
        designation
        speciality
        phoneNumber
        email
        isActive
        profilePic
      }
      clinicCount
      clinicNames
      totalAppointments
      appointmentsThisMonth
      aiAppointmentsThisMonth
      totalPatientsSeen
      totalPrescriptions
      appointmentLimit
      appointmentsUsed
      subscriptionStatus
      subscriptionEndsAt
      subscriptionDaysRemaining
      linkedClinics {
        clinicId
        name
        cityName
        openTime
        closeTime
      }
      recentAppointments {
        appointmentId
        patientName
        patientMobile
        serviceType
        startTime
        status
        creationSource
        paymentStatus
      }
    }
  }
`;
