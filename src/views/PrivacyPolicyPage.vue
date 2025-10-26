<template>
  <div class="privacy-page">
    <div class="privacy-page__wrapper">
      <div class="privacy-page__header">
        <div class="privacy-page__title">Політика конфіденційності</div>
      </div>

      <div class="privacy-page__content">
        <div class="privacy-page__section">
          <div class="privacy-page__section-title">1. Загальні положення</div>
          <div class="privacy-page__section-text">
            Цей сервіс є платформою для перегляду меню ресторанів та оформлення замовлень. Ми не продаємо товари чи послуги, не
            обробляємо оплату та не відповідаємо за виконання замовлень. Користування сервісом означає погодження з цією Політикою.
          </div>
        </div>

        <div class="privacy-page__section">
          <div class="privacy-page__section-title">2. Збір інформації</div>
          <div class="privacy-page__section-text">
            Ми збираємо лише технічну інформацію: IP-адресу, тип пристрою, браузер, дату та час відвідування. Персональні дані, надані
            при оформленні замовлення (ім'я, телефон, адреса, вік), обробляються безпосередньо ресторанами і не зберігаються на нашому
            сервісі.
          </div>
        </div>

        <div class="privacy-page__section">
          <div class="privacy-page__section-title">3. Передача інформації</div>
          <div class="privacy-page__section-text">
            Ми не передаємо персональні дані третім особам, окрім випадків, необхідних для роботи сервісу (передача замовлення
            ресторану). Всі замовлення, включно з продажем алкоголю, обробляються ресторанами, які несуть повну відповідальність за
            дотримання законів.
          </div>
        </div>

        <div class="privacy-page__section">
          <div class="privacy-page__section-title">4. Відповідальність</div>
          <div class="privacy-page__section-text">
            Ми не несемо відповідальності за:
            <br />
            <ul>
              <li>- Виконання замовлень ресторанами;</li>
              <li>- Якість товарів та послуг, наданих ресторанами;</li>
              <li>- Дотримання законів щодо продажу алкоголю та перевірки віку покупців;</li>
              <li>- Будь-які збитки або пошкодження, що виникли внаслідок використання сервісу.</li>
              <li>- Будь-які cуперечки вирішуються безпосередньо між користувачем і рестораном.</li>
            </ul>
          </div>
        </div>

        <div class="privacy-page__section">
          <div class="privacy-page__section-title">5. Cookies та аналітика</div>
          <div class="privacy-page__section-text">
            Ми можемо використовувати лише технічні cookies або аналітичні інструменти для покращення роботи сервісу. Cookies не
            збирають персональні або платіжні дані користувачів.
          </div>
        </div>

        <div class="privacy-page__section">
          <div class="privacy-page__section-title">6. Зміни політики</div>
          <div class="privacy-page__section-text">
            Ми залишаємо за собою право змінювати цю Політику без попереднього повідомлення. Користувачі зобов'язані ознайомлюватися з
            актуальною версією перед використанням сервісу.
          </div>
        </div>

        <div class="privacy-page__section">
          <div class="privacy-page__section-title">7. Контактна інформація</div>
          <div class="privacy-page__section-text">
            Для запитань щодо конфіденційності звертайтеся за електронною адресою:
            <a href="mailto:your-email@example.com">your-email@example.com</a>.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePreloader } from '@/composable/usePreloader'
import { onMounted } from 'vue'

const { showPreloader, hidePreloader } = usePreloader()

// Показуємо прелоадер при завантаженні сторінки
showPreloader()

onMounted(() => {
  // Вимикаємо прелоадер після завантаження сторінки
  hidePreloader()
})
</script>

<style scoped lang="scss">
@use '@/assets/styles/vars.scss' as *;

.privacy-page {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
  min-height: 100vh;
  background-color: $background;

  &__wrapper {
    background-color: $background;
    padding-bottom: 30px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }

  &__header {
    position: relative;
    padding: 20px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 1px solid $beige;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 24px;
    font-weight: 600;
    color: $text;
  }

  &__content {
    padding: 0 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &__section {
    margin-bottom: 20px;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &__section-title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 10px;
    color: $text;
  }

  &__section-text {
    font-size: 16px;
    line-height: 1.5;
    color: $text;
    white-space: pre-line;
    user-select: text;
  }
}
</style>