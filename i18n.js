document.addEventListener('DOMContentLoaded', function() {
    const languageSelect = document.getElementById('language-select');

    function loadTranslations(lang) {
        const translationFiles = ['homepage','common'];
        const translations = {};

        Promise.all(
            translationFiles.map(file => 
                fetch(`locales/${lang}/${file}.json`)
                    .then(response => response.json())
                    .then(data => Object.assign(translations, data))
            )
        ).then(() => {
            document.querySelectorAll('[data-i18n]').forEach(element => {
                const key = element.getAttribute('data-i18n');
                const keys = key.split('.');
                let value = translations;
                keys.forEach(k => {
                    value = value[k];
                });
                if (value) {
                    element.textContent = value;
                }
            });
        }).catch(error => console.error('Error loading translations:', error));
    }

    const defaultLanguage = 'fr';
    languageSelect.value = defaultLanguage;

    loadTranslations(defaultLanguage);

    languageSelect.addEventListener('change', (event) => {
        loadTranslations(event.target.value);
    });
});
