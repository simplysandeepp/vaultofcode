document.addEventListener('DOMContentLoaded', () => {
    // --- Get all DOM elements ---
    const form = document.getElementById('resume-form');
    const resumePreview = document.getElementById('resume-preview');
    const previewName = document.getElementById('preview-name');
    const previewEmail = document.getElementById('preview-email');
    const previewPhone = document.getElementById('preview-phone');
    const previewSummaryText = document.getElementById('preview-summary-text');
    const previewEducation = document.getElementById('preview-education');
    const previewSkills = document.getElementById('preview-skills');
    const previewExperience = document.getElementById('preview-experience');

    const educationContainer = document.getElementById('education-container');
    const addEducationBtn = document.getElementById('add-education-btn');
    const experienceContainer = document.getElementById('experience-container');
    const addExperienceBtn = document.getElementById('add-experience-btn');
    const skillsInput = document.getElementById('skills-input');
    const skillsList = document.getElementById('skills-list');
    const clearFormBtn = document.getElementById('clear-form-btn');
    const progressBar = document.getElementById('progressBar');
    const downloadBtn = document.getElementById('download-btn');

    // --- Utility function to update a single element's text ---
    const updatePreviewText = (element, value, defaultText) => {
        element.textContent = value.trim() || defaultText;
    };

    // --- Main function to update the entire resume preview ---
    const updateResume = () => {
        updatePreviewText(previewName, form.name.value, 'Your Full Name');
        updatePreviewText(previewEmail, form.email.value, 'email@example.com');
        updatePreviewText(previewPhone, form.phone.value, '+123-456-7890');
        updatePreviewText(previewSummaryText, form['profile-summary'].value, 'A brief summary of your skills and experience will appear here.');
        updateEducation();
        updateExperience();
        updateSkills();
        updateProgressBar();
    };

    // --- Dynamic Education Section ---
    const updateEducation = () => {
        let educationHTML = '';
        const educationEntries = educationContainer.querySelectorAll('.education-entry');
        if (educationEntries.length > 0) {
            educationEntries.forEach(entry => {
                const degree = entry.querySelector('.education-degree').value;
                const institution = entry.querySelector('.education-institution').value;
                const dates = entry.querySelector('.education-dates').value;

                if (degree || institution || dates) {
                    educationHTML += `
                        <div class="education-item">
                            <h4>${degree || 'Degree'}</h4>
                            <h5>${institution || 'Institution'} | ${dates || 'Dates'}</h5>
                        </div>
                    `;
                }
            });
        }
        previewEducation.innerHTML = educationHTML;
    };

    const addEducationRow = () => {
        const newEntry = document.createElement('div');
        newEntry.classList.add('education-entry');
        newEntry.innerHTML = `
            <input type="text" class="education-degree" placeholder="Degree (e.g., B.Sc. in Computer Science)">
            <input type="text" class="education-institution" placeholder="University/Institution">
            <input type="text" class="education-dates" placeholder="Dates Attended (e.g., 2018-2022)">
        `;
        educationContainer.appendChild(newEntry);
        // Add event listeners to the new inputs
        newEntry.querySelectorAll('input').forEach(input => {
            input.addEventListener('input', updateResume);
        });
    };

    addEducationBtn.addEventListener('click', addEducationRow);

    // --- Dynamic Experience Section ---
    const updateExperience = () => {
        let experienceHTML = '';
        const experienceEntries = experienceContainer.querySelectorAll('.experience-entry');
        if (experienceEntries.length > 0) {
            experienceEntries.forEach(entry => {
                const company = entry.querySelector('.experience-company').value;
                const position = entry.querySelector('.experience-position').value;
                const dates = entry.querySelector('.experience-dates').value;
                const description = entry.querySelector('.experience-description').value;

                if (company || position || dates || description) {
                    experienceHTML += `
                        <div class="experience-item">
                            <h4>${position || 'Position Title'} at ${company || 'Company Name'}</h4>
                            <h5>${dates || 'Dates Worked'}</h5>
                            <p>${description || 'Description of your responsibilities...'}</p>
                        </div>
                    `;
                }
            });
        }
        previewExperience.innerHTML = experienceHTML;
    };

    const addExperienceRow = () => {
        const newEntry = document.createElement('div');
        newEntry.classList.add('experience-entry');
        newEntry.innerHTML = `
            <input type="text" class="experience-company" placeholder="Company Name">
            <input type="text" class="experience-position" placeholder="Position Title">
            <input type="text" class="experience-dates" placeholder="Dates Worked (e.g., 2022-Present)">
            <textarea class="experience-description" rows="3" placeholder="Description of your responsibilities..."></textarea>
        `;
        experienceContainer.appendChild(newEntry);
        // Add event listeners to the new inputs
        newEntry.querySelectorAll('input, textarea').forEach(input => {
            input.addEventListener('input', updateResume);
        });
    };

    addExperienceBtn.addEventListener('click', addExperienceRow);

    // --- Skills Tag Section ---
    const updateSkills = () => {
        const skillTags = skillsList.querySelectorAll('.skill-tag');
        let skillsHTML = '';
        skillTags.forEach(tag => {
            const skillText = tag.textContent.replace('×', '').trim();
            skillsHTML += `<li>${skillText}</li>`;
        });
        previewSkills.querySelector('.skills-list').innerHTML = skillsHTML;
    };

    skillsInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && skillsInput.value.trim() !== '') {
            e.preventDefault();
            const skillText = skillsInput.value.trim();
            
            const newSkillTag = document.createElement('span');
            newSkillTag.classList.add('skill-tag');
            newSkillTag.innerHTML = `${skillText} <span class="remove-skill">×</span>`;
            
            skillsList.appendChild(newSkillTag);
            skillsInput.value = '';

            // Add event listener to remove the skill tag
            newSkillTag.querySelector('.remove-skill').addEventListener('click', () => {
                newSkillTag.remove();
                updateSkills();
            });
            updateSkills();
        }
    });
    
    // --- Clear Form Button ---
    clearFormBtn.addEventListener('click', () => {
        form.reset();
        // Clear all dynamically added sections
        document.querySelectorAll('.education-entry:not(:first-child)').forEach(el => el.remove());
        document.querySelectorAll('.experience-entry:not(:first-child)').forEach(el => el.remove());
        skillsList.innerHTML = '';
        updateResume();
    });

    // --- Bonus: Progress Bar ---
    const updateProgressBar = () => {
        const totalFields = document.querySelectorAll('#resume-form input, #resume-form textarea').length;
        const filledFields = document.querySelectorAll('#resume-form input:not([type="checkbox"]):not(:placeholder-shown), #resume-form textarea:not(:placeholder-shown)').length;
        const skillsCount = skillsList.querySelectorAll('.skill-tag').length > 0 ? 1 : 0;
        
        let completed = filledFields + skillsCount;
        let total = totalFields;
        
        const progress = (completed / total) * 100;
        progressBar.style.width = `${progress}%`;
    };

    // --- Bonus: Download as PDF ---
    downloadBtn.addEventListener('click', () => {
        // Hide form, show only resume for PDF generation
        document.querySelector('.input-form').style.display = 'none';
        
        html2pdf(resumePreview, {
            margin: 10,
            filename: 'resume.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        }).then(() => {
            // Restore form visibility
            document.querySelector('.input-form').style.display = 'block';
        });
    });

    // --- Initial setup and event listeners ---
    // Update preview on any form input
    form.addEventListener('input', updateResume);
    // Initial call to populate the preview with default values
    updateResume();
});