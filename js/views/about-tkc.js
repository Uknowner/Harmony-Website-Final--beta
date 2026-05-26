import { harmonyDetails } from "../utils.js";
    
export function render() {
const html = `
<div class="cards">
<section class="card">
    <h2>About TKC Properties</h2>
    <p>
          TKC Group is a Pretoria-based group of companies established to support students and emerging entrepreneurs. 
          The group provides services including driver’s licence assistance, residential accommodation, and access to 
          office and retail spaces across its managed properties.
    </p>

    <p>
        <strong>Mission</strong><br>
            TKC Group is committed to delivering high-quality, accessible services across its divisions. 
            In driver education, the focus is on safety, affordability, and producing responsible drivers. 
            In property, the goal is to provide suitable and affordable accommodation that meets the needs 
            of urban residents.
    </p>

    <p>
        <strong>Vision</strong><br>
            TKC Group aims to be a leading service provider in South Africa by expanding access to safe housing 
            and essential services, ensuring more individuals have both a place to live and the opportunity to 
            move forward independently.
    </p>
  </section>

  <!-- Contact Redirect Section -->
  <section class="card text-center">
    <h2>Enquiries</h2>

    <p>
      All enquiries, applications, and property-related requests are handled
      directly by TKC Properties.
    </p>

    <a href="https://www.tkcgroup.co.za/contact.html" target="_blank" class="btn">
      Contact TKC Properties
    </a>
  </section>
  </div>`
  
  return html;
}