const defaultCardNumber = '#### #### #### ####';
const defaultCardHolder = 'JAN KOWALSKI';

export default function(){
    const cardNumberInput = document.querySelector('.card__form--input_card_number');
    const cardHolderInput = document.querySelector('.card__form--input_card_name');
    const cardNumberPreview = document.querySelector('.card__preview--number');
    const cardHolderPreviewWrapper = document.querySelector('.card__preview--wrapper');
    // const cardHolderPreview = document.querySelector('.card__holder--holder_value');
    const cardHolderPreviewValue = document.querySelector('.card__holder--holder_value');
    // const expirationDatePreviewLabel = document.querySelector('.card__preview--expiration');
    const expirationDatePreviewValue = document.querySelector('.card__preview--expiration-date');
    const cardMonthSelect = document.querySelector('#card__form--select_month');
    const cardYearSelect = document.querySelector('#card__form--select_year');
    const cardCVVInput = document.querySelector('.card__form--input_cvv');
    const form = document.querySelector('.card__form');

    //card number

    cardNumberInput.addEventListener('input', () => {
        if (cardNumberInput.value.length >= 19) {
            cardNumberInput.value = cardNumberInput.value.substring(0, 19);
        }

        //add space every four characters
        const formatCardNumber = number => {
            const cleaned = number.replace(/\s+/g, '');
            const matched = cleaned.match(/.{1,4}/g);   
            return matched ? matched.join(' ') : '';  
        }

        cardNumberInput.addEventListener('input', () => {
            const inputVal = cardNumberInput.value.replace(/\s/g, ''); // Remove spaces from the input
            const formattedInput = formatCardNumber(inputVal);         // Format input with spaces
            cardNumberInput.value = formattedInput;                    // Update the input field with the formatted value

            // Prepare the card number preview: replace entered characters and mask the rest
            let cardNumberFormatted = '';
            for (let i = 0; i < defaultCardNumber.length; i++) {
                if (i < formattedInput.length) {
                    cardNumberFormatted += formattedInput[i];
                } else if (defaultCardNumber[i] === ' ') {
                    cardNumberFormatted += ' '; // Keep spaces
                } else {
                    cardNumberFormatted += '#'; // Mask remaining characters
                }
            }

            cardNumberPreview.textContent = cardNumberFormatted;

        })
        
    });

    //card holder

    cardHolderInput.addEventListener('input', () => {
        cardHolderPreviewValue.textContent = cardHolderInput.value.toUpperCase() || defaultCardHolder;
    });

    //expiration date

    const updateExpirationDate = () => {
        //show only last two year digits
        expirationDatePreviewValue.textContent = `${cardMonthSelect.value || 'MM'}/${ cardYearSelect.value ? cardYearSelect.value.slice(2) : 'YY'}`;
    }

    cardMonthSelect.addEventListener('change', updateExpirationDate);
    cardYearSelect.addEventListener('change', updateExpirationDate);

    //cvv

    const cvvPreview = document.createElement('p');
    cvvPreview.classList.add('card__preview--cvv');
    cvvPreview.textContent = 'CVV: ###';
    cvvPreview.style.display = 'none';
    document.querySelector('.card__preview').appendChild(cvvPreview);

    cardCVVInput.addEventListener('focus', () => {
        //hide other previews on focus and show cvv preview
        cardNumberPreview.style.display = 'none';
        cardHolderPreviewWrapper.style.display = 'none';
        cvvPreview.style.display = 'block';
    });

    cardCVVInput.addEventListener('blur', () => {
        //show other previews and hide cvv preview
        cardNumberPreview.style.display = 'block';
        cardHolderPreviewWrapper.style.display = 'flex';
        cvvPreview.style.display = 'none';
    });

    cardCVVInput.addEventListener('input', () => {
        if (cardCVVInput.value.length >= 3) {
            cardCVVInput.value = cardCVVInput.value.substring(0, 3);
        }

        const cvvValue = cardCVVInput.value || '###'; // Default value if empty
        cvvPreview.textContent = `CVV: ${cvvValue}`;
    });

    form.addEventListener('submit', (e) => e.preventDefault()
    )
}