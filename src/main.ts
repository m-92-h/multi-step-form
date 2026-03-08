import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./style.css";

//  DOM Elements — Step 1
const nameInput        = document.getElementById('name')  as HTMLInputElement;
const emailInput       = document.getElementById('email') as HTMLInputElement;
const telephoneInput   = document.getElementById('tel')   as HTMLInputElement;
const errorMsgs        = document.querySelectorAll<HTMLSpanElement>('.error-message');
const trueIcons        = document.querySelectorAll<SVGElement>('.icon-checkmark');

const inputGroupName  = document.getElementById('inputName')  as HTMLDivElement;
inputGroupName.classList.remove('input-group');
const inputGroupEmail = document.getElementById('inputEmail') as HTMLDivElement;
inputGroupEmail.classList.remove('input-group');
const inputGroupTel   = document.getElementById('inputTel')   as HTMLDivElement;
inputGroupTel.classList.remove('input-group');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//  DOM Elements — Navigation
const contentSteps = document.querySelectorAll<HTMLDivElement>('.step-content');
const numberStep   = document.querySelectorAll<HTMLButtonElement>('.step-number');
const backButtons  = document.querySelectorAll<HTMLButtonElement>('.button-back');
const nextButtons  = document.querySelectorAll<HTMLInputElement>('.next-step-btn');
let currentStepIndex: number = 0;

//  Step 1 — Validation
function validateStepOne(): boolean {
    let formIsValid = true;

    const nameValue      = nameInput.value.trim();
    const emailValue     = emailInput.value.trim();
    const telephoneValue = telephoneInput.value.trim();

    // ------------------------ check Name ------------------------------
    if (nameValue === '') {
        errorMsgs[0].style.visibility = 'visible';
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');
        formIsValid = false;
    } else {
        errorMsgs[0].style.visibility = 'hidden';
        nameInput.classList.remove('is-invalid');
        nameInput.classList.add('is-valid');
        trueIcons[0].classList.remove('d-none');
        inputGroupName.classList.add('input-group');
        nameInput.style.borderRight = 'none';
    }

    // --------------------------- check Email ------------------------------
    const emailErrorIndex = 1;
    const telErrorIndex   = 2;

    if (!emailRegex.test(emailValue) || emailValue === '') {
        errorMsgs[emailErrorIndex].style.visibility = 'visible';
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        formIsValid = false;
    } else {
        errorMsgs[emailErrorIndex].style.visibility = 'hidden';
        emailInput.classList.remove('is-invalid');
        emailInput.classList.add('is-valid');
        trueIcons[1].classList.remove('d-none');
        inputGroupEmail.classList.add('input-group');
        emailInput.style.borderRight = 'none';
    }

    // ------------------------- check Telephone ---------------------------
    if (telephoneValue === '') {
        errorMsgs[telErrorIndex].style.visibility = 'visible';
        telephoneInput.classList.add('is-invalid');
        telephoneInput.classList.remove('is-valid');
        formIsValid = false;
    } else {
        errorMsgs[telErrorIndex].style.visibility = 'hidden';
        telephoneInput.classList.remove('is-invalid');
        telephoneInput.classList.add('is-valid');
        trueIcons[2].classList.remove('d-none');
        inputGroupTel.classList.add('input-group');
        telephoneInput.style.borderRight = 'none';
    }

    return formIsValid;
}

//  Navigation — Next Buttons
numberStep[0].style.backgroundColor = 'hsl(228, 100%, 84%)';

nextButtons.forEach((button: HTMLInputElement) => {
    button.addEventListener('click', function (event: Event) {

        event.preventDefault();

        let shouldProceed = true;

        if (currentStepIndex === 0) {
            shouldProceed = validateStepOne();
        }

        if (shouldProceed && currentStepIndex < contentSteps.length - 1) {
            contentSteps[currentStepIndex].classList.remove('active-step');
            numberStep[currentStepIndex].style.backgroundColor = 'transparent';

            currentStepIndex++;

            contentSteps[currentStepIndex].classList.add('active-step');
            numberStep[currentStepIndex].style.backgroundColor = 'hsl(228, 100%, 84%)';
        }
    });
});

//  Navigation — Back Buttons
backButtons.forEach((button: HTMLButtonElement) => {
    button.addEventListener('click', function (event: Event) {

        event.preventDefault();

        if (currentStepIndex > 0) {
            contentSteps[currentStepIndex].classList.remove('active-step');
            numberStep[currentStepIndex].style.backgroundColor = 'transparent';

            currentStepIndex--;

            contentSteps[currentStepIndex].classList.add('active-step');
            numberStep[currentStepIndex].style.backgroundColor = 'hsl(228, 100%, 84%)';
        }
    });
});

//  Navigation — Sidebar Step Buttons
numberStep.forEach((button: HTMLButtonElement, targetIndex: number) => {
    button.addEventListener('click', function (event: Event) {

        event.preventDefault();

        let shouldProceed = true;

        if (currentStepIndex === 0 && targetIndex > 0) {
            shouldProceed = validateStepOne();
        }

        if (shouldProceed && currentStepIndex !== targetIndex) {
            contentSteps[currentStepIndex].classList.remove('active-step');
            numberStep[currentStepIndex].style.backgroundColor = 'transparent';

            currentStepIndex = targetIndex;

            contentSteps[currentStepIndex].classList.add('active-step');
            numberStep[currentStepIndex].style.backgroundColor = 'hsl(228, 100%, 84%)';
        }
    });
});

// DOM Elements — Step 2
const switchCheck         = document.getElementById('switchCheck')         as HTMLInputElement;
const priceArcadeYearly   = document.getElementById('priceArcadeYearly')   as HTMLElement;
const priceAdvancedYearly = document.getElementById('priceAdvancedYearly') as HTMLElement;
const priceProYearly      = document.getElementById('priceProYearly')      as HTMLElement;
const monthlyDiscount     = document.querySelectorAll<HTMLElement>('.monthlyDiscount');
const buttonCustom        = document.getElementById('buttonCustom')        as HTMLElement;

// DOM Elements — Step 3
const priceService = document.getElementById('priceService') as HTMLElement;
const priceStorage = document.getElementById('priceStorage') as HTMLElement;
const priceProfile = document.getElementById('priceProfile') as HTMLElement;

// DOM Elements — Step 4
const titleSpet4 = document.getElementById('titleSpet4') as HTMLElement;
const totalPrice = document.getElementById('totalPrice') as HTMLElement;
const priceMode  = document.getElementById('priceMode')  as HTMLElement;

//  Plan Cards
const cards         = document.querySelectorAll<HTMLDivElement>('.clickCard');

let selectedPlanName: string     = 'Arcade';
let selectedBillingCycle: string = '(Monthly)';

function updateSummaryTitle(): void {
    titleSpet4.textContent = `${selectedPlanName} ${selectedBillingCycle}`;
}

if (cards.length > 0) {
    cards[0].classList.add('selected-card');
}

cards.forEach((card: HTMLDivElement) => {
    card.addEventListener('click', function () {
        cards.forEach((c: HTMLDivElement) => c.classList.remove('selected-card'));
        this.classList.add('selected-card');

        const cardTitleElement = this.querySelector<HTMLElement>('.card-title');
        if (cardTitleElement) {
            selectedPlanName = cardTitleElement.textContent?.trim() ?? '';
        }

        updateSummaryTitle();
    });
});

const cardSubtitles = document.querySelectorAll<HTMLElement>('.card-subtitle');
let result2: RegExpMatchArray | null = null;

cards.forEach((card: HTMLDivElement, indexcards: number) => {
    card.addEventListener('click', function () {

        const cardTitleElement = this.querySelector<HTMLElement>('.card-title');
        if (cardTitleElement) {
            selectedPlanName = cardTitleElement.textContent?.trim() ?? '';
        }

        priceMode.textContent = cardSubtitles[indexcards].textContent;
        result2 = (priceMode.textContent ?? '').match(/\d+/);

        updateSummaryTitle();
    });
});

//  Billing Cycle Toggle (Monthly / Yearly)
switchCheck.addEventListener('change', function () {

    const isYearly: boolean = this.checked;

    if (isYearly) {
        // Step 2
        priceArcadeYearly.textContent   = '$90/yr';
        priceAdvancedYearly.textContent = '$120/yr';
        priceProYearly.textContent      = '$150/yr';
        monthlyDiscount[0].classList.remove('d-none');
        monthlyDiscount[1].classList.remove('d-none');
        monthlyDiscount[2].classList.remove('d-none');
        buttonCustom.classList.remove('mt-5');
        buttonCustom.classList.add('mt-3');
        // Step 3
        priceService.textContent = '+$10/yr';
        priceStorage.textContent = '+$20/yr';
        priceProfile.textContent = '+$20/yr';
        // Step 4
        totalPrice.textContent = 'Total (per year)';
        selectedBillingCycle   = '(Yearly)';
    } else {
        // Step 2
        priceArcadeYearly.textContent   = '$9/mo';
        priceAdvancedYearly.textContent = '$12/mo';
        priceProYearly.textContent      = '$15/mo';
        monthlyDiscount[0].classList.add('d-none');
        monthlyDiscount[1].classList.add('d-none');
        monthlyDiscount[2].classList.add('d-none');
        buttonCustom.classList.remove('mt-3');
        buttonCustom.classList.add('mt-5');
        // Step 3
        priceService.textContent = '+$1/mo';
        priceStorage.textContent = '+$2/mo';
        priceProfile.textContent = '+$2/mo';
        // Step 4
        totalPrice.textContent = 'Total (per month)';
        selectedBillingCycle   = '(Monthly)';
    }

    updateSummaryTitle();
});

//  Add-on Cards
const addOnCards  = document.querySelectorAll<HTMLDivElement>('.add-ons-card');
const titleFooter = document.querySelectorAll<HTMLHeadingElement>('.content-footer > h6');
const priceFooter = document.querySelectorAll<HTMLDivElement>('.content-footer .price');
const sumTotal    = document.querySelector<HTMLHeadingElement>('.sum-total > h5') as HTMLHeadingElement;

let sum: number = 0;

addOnCards.forEach((card: HTMLDivElement, indexFooter: number) => {
    card.addEventListener('click', function () {

        const checkbox = this.querySelector<HTMLInputElement>('input[type="checkbox"]');

        if (checkbox) {
            checkbox.checked = !checkbox.checked;

            if (checkbox.checked) {
                this.classList.add('selected-addon-card');

                const addonTitle = this.querySelector<HTMLElement>('.check-content > h6');
                const addonPrice = this.querySelector<HTMLElement>('.add-ons-card .last-child');

                titleFooter[indexFooter].textContent = addonTitle?.textContent ?? '';
                priceFooter[indexFooter].textContent = addonPrice?.textContent ?? '';

                const result = (priceFooter[indexFooter].textContent ?? '').match(/\d+/);
                if (result) sum += parseInt(result[0]);

            } else {
                this.classList.remove('selected-addon-card');
                titleFooter[indexFooter].textContent = '';

                const result = (priceFooter[indexFooter].textContent ?? '').match(/\d+/);
                if (result) sum -= parseInt(result[0]);

                priceFooter[indexFooter].textContent = '';
            }

            const basePriceMatch = result2 ? parseInt(result2[0]) : 0;
            const cycle: string  = switchCheck.checked ? 'yr' : 'mo';
            sumTotal.textContent = `+$${sum + basePriceMatch}/${cycle}`;
        }
    });
});