import { harmonyDetails } from "../utils.js";
    
export function render() {
    const html = `
    <div class="cards">
    <div class="card"  id="application-card">
    <h1>Application Process Information</h1>

    <div class="important">
      <strong>Important:</strong> Applications operate on a 
      <strong>first come, first serve</strong> basis. 
      Applicants are encouraged to arrive early as available spaces may fill quickly.
    </div>

    <p>
      All applicants are required to present the necessary documentation
      during the application process for verification purposes.
    </p>

    <p>
      Incomplete documentation may result in delays or disqualification
      from the application process.
    </p>

    <div class="documents">
      <h2>Required Documents</h2>

      <ul>
        <li>Student Verification Letter</li>
        <li>Certified ID Document / Identity Card</li>
        <li>University Student Intake Letter / Proof of Admission</li>
      </ul>
    </div>

    <div class="footer-note">
      Please ensure that all documents are clear, valid, and up to date before arrival.
    </div>

  </div>
  </div>`
  
  return html;
}