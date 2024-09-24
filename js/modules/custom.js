const defaultCardNumber = '#### #### #### ####';
const defaultCardHolder = 'Jan Kowalski';

export default function(){
    const cardNumberInput = document.querySelector('.card__form--input_card_number');
    const cardHolderInput = document.querySelector('.card__form--input_card_name');
    const cardNumberPreview = document.querySelector('.card__preview--number');
    const cardHolderPreview = document.querySelector('.card__preview--holder');
    const expirationDatePreview = document.querySelector('.card__preview--expiration-date');
    const cardMonthSelect = document.querySelector('#card__form--select_month');
    const cardYearSelect = document.querySelector('#card__form--select_year');

    cardNumberInput.addEventListener('input', () => {
        if (cardNumberInput.value.length >= 19) {
            cardNumberInput.value = cardNumberInput.value.substring(0, 19);
        }

        //add space every four characters
        const  formatCardNumber = number => {
            const cleaned = number.replace(/\s+/g, '');
            const matched = cleaned.match(/.{1,4}/g);   
            return matched ? matched.join(' ') : '';  
        }

        cardNumberInput.addEventListener('input', function() {
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

    cardHolderInput.addEventListener('input', () => {
        cardHolderPreview.textContent = cardHolderInput.value || defaultCardHolder;
    });

    function updateExpirationDate() {
        //show only last two year digits
        expirationDatePreview.textContent = `${cardMonthSelect.value || 'MM'}/${ cardYearSelect.value ? cardYearSelect.value.slice(2) : 'YY'}`;
    }

    cardMonthSelect.addEventListener('change', updateExpirationDate);
    cardYearSelect.addEventListener('change', updateExpirationDate);
}