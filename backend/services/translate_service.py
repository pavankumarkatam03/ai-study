from deep_translator import GoogleTranslator
from services.tts_service import audio_converter_greet

def greeting(greet_lang):
    translation = GoogleTranslator(source='en',target=greet_lang).translate("Hello, Im your Teacher, How can I Help You?")
    print(translation)
    audio_converter_greet(translation,greet_lang)

def translate_to_machine(response):
    translation = GoogleTranslator(source='auto',target='en').translate(response)
    print("translted response:",translation)
    return translation