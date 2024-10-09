document.getElementById('resume-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const fileInput = document.getElementById('image').files[0];
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const education = document.getElementById('education').value;
    const projects = document.getElementById('projects').value;
    const skills = document.getElementById('skills').value.split(',');
    const experience = document.getElementById('experience').value;
    const achievements = document.getElementById('achievements').value;
    const format = document.getElementById('format').value;

    // Convert image file to base64 URL
    const reader = new FileReader();
    reader.onloadend = function() {
        const imageDataUrl = reader.result;

        // Generate resume output based on selected format
        let resumeOutput = '';
        if (format === 'format1') {
            resumeOutput = `
                <img src="${imageDataUrl}" alt="Profile Image">
                <h2>${name}</h2>
                <p>Email: ${email}</p>
                <p>Phone: ${phone}</p>
                <h3>Education</h3>
                <p>${education}</p>
                <h3>Projects</h3>
                <p>${projects}</p>
                <h3>Skills</h3>
                <ul>${skills.map(skill => <li>${skill.trim()}</li>).join('')}</ul>
                <h3>Experience</h3>
                <p>${experience}</p>
                <h3>Achievements</h3>
                <p>${achievements}</p>
            `;
        } else if (format === 'format2') {
            resumeOutput = `
                <div style="text-align:center;">
                    <h2>${name}</h2>
                    <img src="${imageDataUrl}" alt="Profile Image" style="display:block; margin:0 auto;">
                </div>
                <h3>Contact Information</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <h3>Education</h3>
                <p>${education}</p>
                <h3>Skills</h3>
                <p>${skills.join(', ')}</p>
                <h3>Projects & Achievements</h3>
                <p>${projects}<br/>${achievements}</p>
            `;
        } else if (format === 'format3') {
            resumeOutput = `
                <div style="color:blue; text-align:center;">
                    <h2>${name}</h2>
                    <img src="${imageDataUrl}" alt="Profile Image" style="width:100px;">
                </div>
                <h3>Contact</h3>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Phone:</strong> ${phone}</p>
                <h3>About Me</h3>
                <p>Education: ${education}</p>
                <h3>Skills</h3>
                <ul>${skills.map(skill => <li>${skill.trim()}</li>).join('')}</ul>
                <h3>Experience</h3>
                <p>${experience}</p>
                <h3>Achievements</h3>
                <p>${achievements}</p>
            `;
        }

        // Display resume
        document.getElementById('resume-output').innerHTML = resumeOutput;

        // Show download button after resume is generated
        document.getElementById('download-btn').style.display = 'block';
    };

    if (fileInput) {
        reader.readAsDataURL(fileInput);
    }
});

// Download resume as PDF
document.getElementById('download-btn').addEventListener('click', function() {
    const resume = document.getElementById('resume-output');
    
    // Use html2pdf.js to convert the resume to a PDF
    html2pdf()
        .from(resume)
        .set({
            margin: 1,
            filename: 'resume.pdf',
            html2canvas: { scale: 2 },
            jsPDF: { orientation: 'portrait', unit: 'in', format: 'letter', compressPDF: true }
        })
        .save();
});