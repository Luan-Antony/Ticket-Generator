document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const usernameInput = document.getElementById("username");
    const fileUpload = document.getElementById("file-upload");
    const uploadedImage = document.querySelector(".uploaded-image");
    const ticketAvatar = document.querySelector(".ticket-avatar");

    const ticketNameSpan = document.querySelector(".ticket-name");
    const ticketEmailSpan = document.querySelector(".header.ticket-header p span");
    const ticketUsernameSpan = document.querySelector(".ticket-username");
    const headerNameSpan = document.querySelector(".header.ticket-header h2 span");

    const formSection = document.querySelector('.form.main');
    const ticketSection = document.querySelector('.ticket');
    const generateButton = document.querySelector('.btn');

    const fileError = document.querySelector(".upload-note .error");
    const emailError = document.querySelector(".email-error");

    const uploadIcon = document.querySelector(".upload-icon");
    const uploadText = document.querySelector(".upload-text");
    const uploadArea = document.querySelector(".upload-area");
    
    const buttons = document.querySelector(".buttons");
    const submitButton = document.querySelector(".btn");
    const removeButton = document.querySelector(".remove-button");
    const changeButton = document.querySelector(".change-button");

    const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB


    // ================================
    // Funções de atualização do ticket
    // ================================


    function updateTicket() {
        const fullName = nameInput.value.trim();
        const email = emailInput.value.trim();
        const username = usernameInput.value.trim();

        headerNameSpan.textContent = fullName || "[Your Name]";
        ticketNameSpan.textContent = fullName || "[Your Name]";
        ticketEmailSpan.textContent = email || "[Your Email]";
        ticketUsernameSpan.textContent = username || "[Your GitHub Username]";
    }


    // ================================
    // Validação de E-mail
    // ================================


    const validateEmail = () => {
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(emailValue)) {
            showError(emailError, "Please enter a valid email address.");
            return false;
        }

        hideError(emailError);
        return true;
    };


    // ================================
    // Funções para mostrar e esconder erros
    // ================================


    const showError = (element, message) => {
        element.classList.remove("hidden");
        element.innerHTML = message;        
        const input = element.previousElementSibling;
        if (input) {
            input.classList.add("input-error");
        }
    };
    
    const hideError = (element) => {
        element.classList.add("hidden");
        element.innerHTML = "";
    
        const input = element.previousElementSibling;
        if (input) {
            input.classList.remove("input-error");
        }
    };
    


    // ================================
    // Função para resetar a área de upload
    // ================================


    const resetUploadArea = () => {
        fileUpload.value = "";
        uploadedImage.classList.add("hidden");
        uploadText.classList.remove("hidden");
        buttons.classList.add("hidden");

        uploadArea.classList.remove("uploaded");
        uploadIcon.classList.remove("hidden");
        uploadArea.style.cursor = "pointer";
    };


    // ================================
    // Validação de Arquivo
    // ================================
    

    const validateFile = () => {
        const file = fileUpload.files[0];
        const uploadNote = document.querySelector(".upload-note");
        const defaultNote = uploadNote.querySelector(".image-size");
        const errorNote = uploadNote.querySelector(".error");
        const uploadArea = document.querySelector(".upload-area");

        if (file.size > MAX_FILE_SIZE) {
            defaultNote.classList.add("hidden");
            defaultNote.classList.remove("image-size")
            errorNote.classList.remove("hidden");
            errorNote.classList.add("image-size");

            resetUploadArea(false);
            return false;
        }

        defaultNote.classList.remove("hidden");
        errorNote.classList.add("hidden");
        hideError(fileError);
        uploadIcon.classList.add("hidden");

        const reader = new FileReader();
        reader.onload = (e) => {
            uploadedImage.src = e.target.result;
            uploadedImage.classList.remove("hidden");
            uploadText.classList.add("hidden");
            buttons.classList.remove("hidden");
            uploadArea.classList.add("uploaded");

            ticketAvatar.src = e.target.result;
        };
        reader.readAsDataURL(file);

        return true;
    };


    // ================================
    // Validação Completa do Formulário
    // ================================


    const validateForm = () => {
        const isEmailValid = validateEmail();
        const isFileValid = validateFile();

        if (!isEmailValid || !isFileValid) {
            return false;
        }

        return true;
    };



    // ================================
    // Eventos
    // ================================
    
    
    nameInput.addEventListener("input", updateTicket);
    emailInput.addEventListener("input", () => {
        updateTicket();
        validateEmail();
    });
    usernameInput.addEventListener("input", updateTicket);

    generateButton.addEventListener('click', (event) => {
        event.preventDefault();

        if (validateForm()) {
            formSection.classList.add('hidden');
            ticketSection.classList.remove('hidden');
        }
    });

    fileUpload.addEventListener("change", () => {
        validateFile();
    });

    removeButton.addEventListener("click", resetUploadArea);

    changeButton.addEventListener("click", () => {
        fileUpload.click();
    });

    submitButton.addEventListener("click", (e) => {
        const isEmailValid = validateEmail();
        const isFileValid = validateFile();

        if (!isEmailValid || !isFileValid) {
            e.preventDefault();
        }
    });

    emailInput.addEventListener("input", validateEmail);
});
