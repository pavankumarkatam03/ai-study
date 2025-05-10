import gtts
import playsound
import os

def audio_converter_greet(translation,greet_lang):
    converted_audio = gtts.gTTS(translation,lang=greet_lang)
    if os.path.exists("greet.mp3"):
        os.remove("greet.mp3")
    converted_audio.save("greet.mp3")
    playsound.playsound("greet.mp3")

def speak_response_lang(response,lang2):
    converted_audio = gtts.gTTS(response,lang=lang2)
    if(os.path.exists("response.mp3")):
        os.remove("response.mp3")
    converted_audio.save("response.mp3")
    playsound.playsound("response.mp3")