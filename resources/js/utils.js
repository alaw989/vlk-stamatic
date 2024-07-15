

export const animateAccordion = () => {
    document.addEventListener('DOMContentLoaded', () => {
        const accordionHeaders = document.querySelectorAll('.accordion-header');
        const accordionId = document.getElementById('#accordion');
        console.log(accordionHeaders);
        console.log(accordionId)

        accordionHeaders.forEach(header => {
            header.addEventListener('click', function () {
                // Toggle the active class on the header
                this.classList.toggle('active');

                // Toggle the content visibility
                const content = this.nextElementSibling;
                if (content.style.display === 'block') {
                    content.style.display = 'none';
                } else {
                    content.style.display = 'block';
                }
            });
        });
    });
}
