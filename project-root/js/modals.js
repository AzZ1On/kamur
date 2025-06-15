// Конфигурация
const config = {
  telegram: {
    botToken: '8062470416:AAHcr9UkIF5Rj-PMZ13HPveRrbApgbZG61U',
    chatId: '931819159'
  },
  googleScriptUrl: 'https://script.google.com/d/1bColEvCSJrYM3DRcwoo9BuwuoUMBcQnx0Msd7taWrAlEPxv5dAum2iJk/edit?usp=sharing'
};

// Открытие/закрытие модального окна
function openModal() {
  document.getElementById('requestModal').style.display = 'block';
}

function closeModal() {
  document.getElementById('requestModal').style.display = 'none';
}

// Отправка данных
async function sendFormData(formData) {
  try {
    // Отправка в Telegram
    const telegramText = `Новая заявка:\nИмя: ${formData.name}\nТелефон: ${formData.phone}\nEmail: ${formData.email}\nСообщение: ${formData.message}`;
    const telegramUrl = `https://api.telegram.org/bot${config.telegram.botToken}/sendMessage?chat_id=${config.telegram.chatId}&text=${encodeURIComponent(telegramText)}`;
    
    // Отправка в Google Sheets
    const googleResponse = await fetch(config.googleScriptUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    const telegramResponse = await fetch(telegramUrl);
    
    if (!googleResponse.ok || !telegramResponse.ok) {
      throw new Error('Ошибка отправки данных');
    }
    
    return true;
  } catch (error) {
    console.error('Ошибка:', error);
    return false;
  }
}

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
  // Модальное окно
  document.querySelector('.close').addEventListener('click', closeModal);
  window.addEventListener('click', function(event) {
    if (event.target === document.getElementById('requestModal')) {
      closeModal();
    }
  });
  
  // Обработка формы
  document.getElementById('requestForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
      name: document.getElementById('name').value.trim(),
      phone: document.getElementById('phone').value.trim(),
      email: document.getElementById('email').value.trim(),
      message: document.getElementById('message').value.trim()
    };
    
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';
    
    const isSuccess = await sendFormData(formData);
    
    if (isSuccess) {
      alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
      closeModal();
      this.reset();
    } else {
      alert('Произошла ошибка. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.');
    }
    
    submitBtn.disabled = false;
    submitBtn.textContent = 'Отправить заявку';
  });
});
// Плавная прокрутка для якорных ссылок
document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70, // Учитываем высоту навбара
        behavior: 'smooth'
      });
    }
  });
});