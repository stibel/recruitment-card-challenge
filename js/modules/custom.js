const defaultCardNumber = '#### #### #### ####';
const defaultCardHolder = 'JAN KOWALSKI';

//I split validating and formating card number and cvv because number contains spaces

const validateCardNumber = number => {
    if (number.length >= 19) {
        number = number.substring(0, 19);
    }
    const cleaned = number.replace(/\s+/g, '');
    const matched = cleaned.match(/.{1,4}/g);
    const joined = matched ? matched.join(' ') : '';

    return joined;
};

const formatCardNumber = number => {
    let cardNumberFormatted = '';
        for (let i = 0; i < defaultCardNumber.length; i++) {
            if (i < number.length) {
                cardNumberFormatted += number[i];
            } else if (defaultCardNumber[i] === ' ') {
                cardNumberFormatted += ' '; // Keep spaces
            } else {
                cardNumberFormatted += '#'; // Mask remaining characters
            }
        }

    return cardNumberFormatted;
}

const validateCVV = cvv => {
    let cvvValue = cvv.replace(/\D/g, ''); 

    if (cvvValue.length > 3) {
        cvvValue = cvvValue.substring(0, 3);
    };

    return cvvValue;
}

const maskCVV = cvv => {
    let maskedCVV = '';
        for (let i = 0; i < 3; i++) {
            if (i < cvv.length) {
                maskedCVV += cvv[i]; 
            } else {
                maskedCVV += '#';
            }
        }

    return maskedCVV;
}

export default function(){
    const cardNumberInput = document.querySelector('.card_form--input_card_number');
    const cardHolderInput = document.querySelector('.card_form--input_card_name');
    const cardNumberPreview = document.querySelector('.card_preview--number');
    const cardHolderPreviewWrapper = document.querySelector('.card_preview--wrapper');
    const cardHolderPreviewValue = document.querySelector('.card__holder--holder_value');
    const expirationDatePreviewValue = document.querySelector('.card_preview--expiration-date');
    const cardMonthSelect = document.querySelector('#card_form--select_month');
    const cardYearSelect = document.querySelector('#card_form--select_year');
    const cardCVVInput = document.querySelector('.card_form--input_cvv');
    const cardCVVPreview = document.querySelector('.card_preview--cvv');
    const form = document.querySelector('.card_form');

    cardNumberInput.addEventListener('input', () => {
        const validatedInput = validateCardNumber(cardNumberInput.value);
        // Update the input field (not preview) value with the formatted value
        cardNumberInput.value = validatedInput;                    

        const formattedNumber = formatCardNumber(validatedInput);

        cardNumberPreview.textContent = formattedNumber;
    });


    cardHolderInput.addEventListener('input', () => {
        cardHolderPreviewValue.textContent = cardHolderInput.value.toUpperCase() || defaultCardHolder;
    });

    //one function to update value from both selects
    const updateExpirationDate = () => {
        //show only last two year digits
        expirationDatePreviewValue.textContent = `${cardMonthSelect.value || 'MM'}/${ cardYearSelect.value ? cardYearSelect.value.slice(2) : 'YY'}`;
    }

    cardMonthSelect.addEventListener('change', updateExpirationDate);
    cardYearSelect.addEventListener('change', updateExpirationDate);

    cardCVVInput.addEventListener('focus', () => {
        //hide other previews on focus and show cvv preview
        cardNumberPreview.style.display = 'none';
        cardHolderPreviewWrapper.style.display = 'none';
        cardCVVPreview.style.display = 'block';
    });

    cardCVVInput.addEventListener('blur', () => {
        //show other previews and hide cvv preview
        cardNumberPreview.style.display = 'block';
        cardHolderPreviewWrapper.style.display = 'flex';
        cardCVVPreview.style.display = 'none';
    });

    cardCVVInput.addEventListener('input', () => {
        const validatedInput = validateCVV(cardCVVInput.value);

        cardCVVInput.value = validatedInput;

        const maskedCVV = maskCVV(validatedInput);

        cardCVVPreview.textContent = `CVV: ${maskedCVV}`;
    });

    form.addEventListener('submit', (e) => e.preventDefault()
    )
}