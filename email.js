const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "satyampandit021@gmail.com",
    pass: "mnlm kfcp wzwb dthw",
  },
});

const emailSender = {
  emailVerification: async (email, ownerName, mobileNumber, pinCode, district, state, country, address) => {
    let isEmailSent = false;

    try {
      const mailOptions = {
        from: "satyampandit021@gmail.com", // Sender address
        to: email, // Recipient's email
        subject: "Acknowledgment of Your Application – Additional Details Required",
        html: `
        <div style="font-family: Arial, sans-serif; color: #333; background: linear-gradient(to right, #4CAF50, #38A1DB); padding: 40px 20px;">
          <div style="max-width: 600px; background-color: white; padding: 40px; border-radius: 15px; margin: 0 auto; box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);">
            <h2 style="color: #4CAF50; text-align: center; font-size: 26px; font-weight: bold; margin-bottom: 20px;">Dear ${ownerName},</h2>
            <p style="font-size: 18px; color: #555;">
              Thank you for submitting your application to lease your property for Reliance Jio tower installation. We are thrilled to consider your property as part of our network expansion initiative.
            </p>
            <p style="font-size: 18px; color: #555;">
              To proceed further with the evaluation, we kindly ask you to share the following KYC documents and property details:
            </p>
            <ul style="font-size: 18px; color: #555; list-style-type: none; padding-left: 20px;">
              <li>• Identity Proof (ID): Aadhar Card and PAN Card (self-attested copies).</li>
              <li>• Property Documents: Ownership papers, property tax receipts, or any relevant legal documents.</li>
              <li>• Bank Statement: Last three months’ bank statements (for rental payment setup).</li>
              <li>• Self-Photograph: A recent passport-size photograph.</li>
              <li>• Site Location Details: Full address and GPS coordinates, if available.</li>
              <li>• Property Photographs: Clear images of the site, including the surrounding area and rooftop/open land.</li>
            </ul>
            <p style="font-size: 18px; color: #555;">
              You can send scanned copies of these documents to our official email ID:
              <strong>towersupport@reliancejio.com</strong>
            </p>
            <p style="font-size: 18px; color: #555;">
              Alternatively, you can contact our support team for assistance at:
            </p>
            <p style="font-size: 18px; color: #555;">
              Phone: <strong>+91-XXXXX-XXXXX</strong><br />
              Support Hours: 24/7 availability.
            </p>
            <p style="font-size: 18px; color: #555;">
              Our Address:<br />
              Reliance Jio Tower Support Team<br />
              [Add the regional/corporate office address here]
            </p>
            <p style="font-size: 18px; color: #555;">
              Our team will review the submitted documents and update you on the next steps within 2-3 business days.
            </p>
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:towersupport@reliancejio.com" style="background-color: #4CAF50; color: white; padding: 15px 30px; text-decoration: none; font-size: 18px; border-radius: 5px; display: inline-block;">Send Documents</a>
            </div>
            <p style="font-size: 18px; color: #999; text-align: center; margin-top: 30px;">
              <strong>Important Notes</strong><br />
              Ensure all documents are clear and legible.<br />
              This acknowledgment does not guarantee final approval; the decision will be based on the submitted details and site inspection.
            </p>
            <p style="font-size: 18px; color: #555; text-align: center; margin-top: 30px;">
              We are excited to partner with you and thank you for being part of the Jio family. For any queries, feel free to reach out anytime.
            </p>
          </div>
          <p style="text-align: center; font-size: 14px; color: #fff; margin-top: 20px;">
            &copy; 2024 Reliance Jio Infocomm Limited. All rights reserved.
          </p>
        </div>
      `,
      };

      await transporter.sendMail(mailOptions);
      isEmailSent = true;
    } catch (error) {
      console.log(error);
      isEmailSent = false;
    }

    return { isEmailSent };
  }
};

module.exports = { emailSender };
