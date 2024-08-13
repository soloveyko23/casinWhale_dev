import asyncio
from telegram import InlineKeyboardButton, InlineKeyboardMarkup, Bot

# Для корректного завершения цикла событий на Windows
asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())

async def main():
    bot = Bot(token="7371733346:AAEdJOMAfOxPfTT0_ifR4GrFWot26yTYMHw")

    # Убедитесь, что используете HTTPS в URL
    button = InlineKeyboardButton(text="Open Web App", web_app={"url": "https://whale.vanlipla.soloveyko-devs.site"})
    keyboard = InlineKeyboardMarkup([[button]])

    await bot.send_message(chat_id="5796969158", text="Click to open Web App", reply_markup=keyboard)

if __name__ == "__main__":
    asyncio.run(main())
