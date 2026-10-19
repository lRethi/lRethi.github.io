(() => {
    const supportedLanguages = ["en", "pt", "es"];
    const languageNames = { en: "English", pt: "Português", es: "Español" };

    function getSavedLanguage() {
        try {
            const saved = localStorage.getItem("portfolio-language");
            if (saved && supportedLanguages.includes(saved)) return saved;
        } catch (error) {}
        const browserLanguage = (navigator.language || "en").toLowerCase();
        if (browserLanguage.startsWith("pt")) return "pt";
        if (browserLanguage.startsWith("es")) return "es";
        return "en";
    }

    function applyTranslations(language) {
        const selectedLanguage = translations[language] ? language : "en";
        const dictionary = translations[selectedLanguage];
        document.documentElement.lang = selectedLanguage === "pt" ? "pt-BR" : selectedLanguage;
        const selector = document.querySelector(".language-selector");
        if (selector) selector.setAttribute("aria-label", selectedLanguage === "pt" ? "Selecionar idioma" : selectedLanguage === "es" ? "Seleccionar idioma" : "Choose language");

        document.querySelectorAll("[data-i18n]").forEach((element) => {
            const translatedText = dictionary[element.dataset.i18n];
            if (typeof translatedText === "string") element.textContent = translatedText;
        });

        document.querySelectorAll("nav[aria-label]").forEach((navigation) => {
            navigation.setAttribute("aria-label", selectedLanguage === "pt" ? "Navegação principal" : selectedLanguage === "es" ? "Navegación principal" : "Primary navigation");
        });

        document.querySelectorAll("[data-language]").forEach((button) => {
            const isActive = button.dataset.language === selectedLanguage;
            button.classList.toggle("active", isActive);
            button.setAttribute("aria-pressed", String(isActive));
            button.setAttribute("aria-label", languageNames[button.dataset.language]);
            button.title = languageNames[button.dataset.language];
        });

        try {
            localStorage.setItem("portfolio-language", selectedLanguage);
        } catch (error) {}
    }

    function createLanguageSelector() {
        const header = document.querySelector("header");
        if (!header) return;

        const selector = document.createElement("div");
        selector.className = "language-selector";
        selector.setAttribute("role", "group");
        selector.setAttribute("aria-label", "Choose language");

        [
            ["en", "EN"],
            ["pt", "PT"],
            ["es", "ES"]
        ].forEach(([language, label]) => {
            const button = document.createElement("button");
            button.type = "button";
            button.dataset.language = language;
            button.textContent = label;
            button.addEventListener("click", () => applyTranslations(language));
            selector.appendChild(button);
        });

        header.prepend(selector);
    }

    document.addEventListener("DOMContentLoaded", () => {
        createLanguageSelector();
        applyTranslations(getSavedLanguage());
    });
})();
