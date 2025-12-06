const form = document.querySelector('form');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const telephoneInput = document.getElementById('tel');
const errorMsgs = document.querySelectorAll('.error-message');
const trueIcons = document.querySelectorAll('.icon-checkmark');

// لاجراء تنسيقات الخاصة بالبوردير ريديوس الايمين من حقل الادخال
const inputGroupName = document.getElementById('inputName');
inputGroupName.classList.remove('input-group');
const inputGroupEmail = document.getElementById('inputEmail');
inputGroupEmail.classList.remove('input-group');
const inputGroupTel = document.getElementById('inputTel');
inputGroupTel.classList.remove('input-group');

// Regular expression for email validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const contentSteps = document.querySelectorAll('.step-content');
const numberStep = document.querySelectorAll('.step-number');
const backButtons = document.querySelectorAll('.button-back');
const nextButtons = document.querySelectorAll('.next-step-btn');
let currentStepIndex = 0;


function validateStepOne() {
    let formIsValid = true; 
    
    const nameValue = nameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const telephoneValue = telephoneInput.value.trim();

    // ------------------------ ckeck Name ------------------------------
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

    // --------------------------- check email ------------------------------
    const emailErrorIndex = 1; // تعديل الاندكس حسب الترتيب الفعلي لـ invalid-feedback في HTML
    const telErrorIndex = 2;  // تعديل الاندكس حسب الترتيب الفعلي لـ invalid-feedback في HTML
    
    // التحقق من الإيميل (استخدام الاندكس الصحيح 1)
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
    // التحقق من الهاتف (استخدام الاندكس الصحيح 2)
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

numberStep[0].style.backgroundColor = 'hsl(228, 100%, 84%)'; // اضافة خلفية للمحتوى الاول
// ----------------------------------------------------
// 1. معالجة النقر على أزرار "Next"
// ----------------------------------------------------
nextButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        
        event.preventDefault(); 
        
        let shouldProceed = true; // افتراض إمكانية الانتقال

        // 🎯 التحقق من الصحة فقط في الخطوة الأولى
        if (currentStepIndex === 0) {
            shouldProceed = validateStepOne();
        }

        // إذا نجح التحقق أو لم نكن في الخطوة الأولى، نقوم بالانتقال
        if (shouldProceed && currentStepIndex < contentSteps.length - 1) { 
            
            // أ. إخفاء المحتوى الحالي باستخدام الفئة
            contentSteps[currentStepIndex].classList.remove('active-step');
            numberStep[currentStepIndex].style.backgroundColor = 'transparent';
            
            // ب. الانتقال للخطوة التالية
            currentStepIndex++; 
            
            // ج. إظهار المحتوى الجديد
            contentSteps[currentStepIndex].classList.add('active-step');
            numberStep[currentStepIndex].style.backgroundColor = 'hsl(228, 100%, 84%)';
        }
    });
});

// ----------------------------------------------------
// 2. معالجة النقر على أزرار "Go Back"
// ----------------------------------------------------
backButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        
        event.preventDefault();

        // شرط الرجوع: الرجوع فقط إذا كان الاندكس الحالي أكبر من 0 
        if (currentStepIndex > 0) {
            
            // أ. إخفاء المحتوى الحالي
            contentSteps[currentStepIndex].classList.remove('active-step');
            numberStep[currentStepIndex].style.backgroundColor = 'transparent';
            
            // ج. الرجوع خطوة للوراء
            currentStepIndex--;

            // د. إظهار المحتوى الجديد (السابق)
            contentSteps[currentStepIndex].classList.add('active-step');
            numberStep[currentStepIndex].style.backgroundColor = 'hsl(228, 100%, 84%)';
        }
    });
});

// ----------------------------------------------------
// 3. معالجة النقر على أزرار "sidebar"
// ----------------------------------------------------
// نستخدم targetIndex كمتغير يمثل الاندكس (0، 1، 2، 3) للزر الذي تم النقر عليه
numberStep.forEach((button, targetIndex) => {
    button.addEventListener('click', function(event) {
        
        event.preventDefault(); 
        
        let shouldProceed = true;
        
        // 1. شرط التحقق من الصحة (Validation):
        // هل نحن حالياً في الخطوة الأولى؟ currentStepIndex === 0
        // هل الخطوة التي يحاول المستخدم الذهاب إليها أكبر من الخطوة الأولى؟(targetIndex > 0).
        if (currentStepIndex === 0 && targetIndex > 0) {
            shouldProceed = validateStepOne();
        }

        // 2. شرط الانتقال الفعلي:
        // ننتقل إذا نجح التحقق (أو إذا لم نكن في الخطوة 1)
        // و إذا كانت الخطوة الهدف (targetIndex) ليست هي الخطوة الحالية.
        if (shouldProceed && currentStepIndex !== targetIndex) {
            
            // أ. إخفاء المحتوى الحالي وإزالة تنسيق الـ sidebar منه
            contentSteps[currentStepIndex].classList.remove('active-step');
            numberStep[currentStepIndex].style.backgroundColor = 'transparent';

            // ب. 💡 التعديل الحاسم: تعيين الـ index مباشرة إلى الاندكس المستهدف
            currentStepIndex = targetIndex; 
            
            // ج. إظهار المحتوى الجديد وتطبيق تنسيق الـ sidebar
            contentSteps[currentStepIndex].classList.add('active-step');
            numberStep[currentStepIndex].style.backgroundColor = 'hsl(228, 100%, 84%)';
        }
    });
});


// كود خاص بتغيير المحتوى بين الشهري والسنوي من الخطوة الثانية الى الرابعة
// متغيرات الخطوة الثانية
const switchCheck = document.getElementById('switchCheck');
const priceArcadeYearly = document.getElementById('priceArcadeYearly');
const priceAdvancedYearly = document.getElementById('priceAdvancedYearly');
const priceProYearly = document.getElementById('priceProYearly');
const monthlyDiscount = document.querySelectorAll('.monthlyDiscount');
const buttonCustom = document.getElementById('buttonCustom');

// متغيرات الخطوة الثالثة
const priceService = document.getElementById('priceService');
const priceStorage = document.getElementById('priceStorage');
const priceProfile = document.getElementById('priceProfile');

//  متغيرات الخطوة الرابعة
const mode = document.getElementById('titleSpet4');
const totalPrice = document.getElementById('totalPrice');
const priceMode = document.getElementById('priceMode');


// ----------------------------------------------------
// 4. معالجة النقر على البطاقات وتحديث الملخص
// ----------------------------------------------------
const cards = document.querySelectorAll('.clickCard');
const titleElements = document.querySelectorAll('.card-title'); // لتجنب التعارض مع titleSpet4

let selectedPlanName = 'Arcade';
let selectedBillingCycle = '(Monthly)';

function updateSummaryTitle() {
    // الجمع بين اسم الخطة ودورة الفوترة المحدثة
    titleSpet4.textContent = `${selectedPlanName} ${selectedBillingCycle}`;
}

// ----------------------------------------------------
// 5. معالجة النقر على البطاقات (Plan Cards)
// ----------------------------------------------------
cards.forEach((card, targetIndex) => {
    card.addEventListener('click', function(event) {
        
        // 1. إدارة فئة التحديد: إزالة التحديد من جميع البطاقات
        cards.forEach(c => {
            c.classList.remove('selected-card');
        });

        // 2. إضافة التحديد للبطاقة التي تم النقر عليها حالياً
        this.classList.add('selected-card');
        
        selectedPlanName = title[targetIndex].textContent.trim();
        
        // 4. تحديث محتوى العنوان في الخطوة الرابعة (titleSpet4)
        titleSpet4.textContent = `${selectedPlanName} ${selectedBillingCycle}`;
    });
});

// 4.1. معالجة النقر على بطاقات الخطة
// تعيين التنسيق الافتراضي للبطاقة الأولى عند تحميل الصفحة
if (cards.length > 0) {
    cards[0].classList.add('selected-card'); 
}

const cardSubtitles = document.querySelectorAll('.card-subtitle')
var result2;
cards.forEach((card ,indexcards) => {
    card.addEventListener('click', function() {

        // 3. تحديث اسم الخطة المحددة
        const cardTitleElement = this.querySelector('.card-title');
        selectedPlanName = cardTitleElement.textContent.trim();
        
        priceMode.textContent = cardSubtitles[indexcards].textContent;
        result2 = (priceMode.textContent).match(/\d+/);

        // 4. تحديث العنوان في الخطوة 4
        updateSummaryTitle();
    });
});


// 4.2. معالجة تغيير دورة الفوترة (شهري/سنوي)
switchCheck.addEventListener('change', function (){
    
    // this.checked تشير الى زر التبديل نفسه اذا كان مفعل يرجع صح واذا لا يرجع خطأ
    const isYearly = this.checked;
    if (isYearly) {
        // محتوى الخطوة الثانية
        priceArcadeYearly.textContent = '$90/yr';
        priceAdvancedYearly.textContent = '$120/yr';
        priceProYearly.textContent = '$150/yr';
        monthlyDiscount[0].classList.remove('d-none');
        monthlyDiscount[1].classList.remove('d-none');
        monthlyDiscount[2].classList.remove('d-none');
        buttonCustom.classList.remove('mt-5');
        buttonCustom.classList.add('mt-3');
        // محتوى الخطوة الثالثة
        priceService.textContent = '+$10/yr';
        priceStorage.textContent = '+$20/yr';
        priceProfile.textContent = '+$20/yr';
        // محتوى الخطوة الرابعة
        totalPrice.textContent = 'Total (per year)';
        selectedBillingCycle = '(Yearly)';
    } else {
        // محتوى الخطوة الثانية
        priceArcadeYearly.textContent = '$9/mo';
        priceAdvancedYearly.textContent = '$12/mo';
        priceProYearly.textContent = '$15/mo';
        monthlyDiscount[0].classList.add('d-none');
        monthlyDiscount[1].classList.add('d-none');
        monthlyDiscount[2].classList.add('d-none');
        buttonCustom.classList.remove('mt-3');
        buttonCustom.classList.add('mt-5');
        // محتوى الخطوة الثالثة
        priceService.textContent = '+$1/mo';
        priceStorage.textContent = '+$2/mo';
        priceProfile.textContent = '+$2/mo';
        // محتوى الخطوة الرابعة
        totalPrice.textContent = 'Total (per month)';
        selectedBillingCycle = '(Monthly)';
    }

    // استدعاء الدالة لتحديث العنوان بالاسم المختار ودورة الفوترة الجديدة
    updateSummaryTitle();
});

// ----------------------------------------------------
// 5. تفعيل الـ Checkbox عند النقر على مستطيل الإضافة (Add-on Card)
// ----------------------------------------------------

// 1. تحديد جميع مستطيلات 
const addOnCards = document.querySelectorAll('.add-ons-card');
const titleFooter = document.querySelectorAll('.content-footer > h6')
const priceFooter = document.querySelectorAll('.content-footer .price')
const sumTotal = document.querySelector('.sum-total > h5');

var sum = 0;
addOnCards.forEach((card ,indexFooter) => {
    card.addEventListener('click', function() {
        
        // 2. البحث عن الـ Checkbox داخل المستطيل الذي تم النقر عليه
        const checkbox = this.querySelector('input[type="checkbox"]');
        
        // 3. التحقق من وجود Checkbox قبل محاولة تعديله
        if (checkbox) {
            checkbox.checked = !checkbox.checked;

            if (checkbox.checked) {
                this.classList.add('selected-addon-card');
                titleFooter[indexFooter].textContent = this.querySelector('.check-content > h6').textContent;
                priceFooter[indexFooter].textContent = this.querySelector('.add-ons-card .last-child').textContent;
                const result = (priceFooter[indexFooter].textContent).match(/\d+/);
                sum += parseInt(result[0]);
            } else {
                this.classList.remove('selected-addon-card');
                titleFooter[indexFooter].textContent = '';
                const result = (priceFooter[indexFooter].textContent).match(/\d+/);
                sum -= parseInt(result[0]);
                priceFooter[indexFooter].textContent = '';
            }
            
            sumTotal.textContent = `+$${sum + parseInt(result2[0])}/${switchCheck.checked? 'yr':'mo'}`;
        }
    });
});