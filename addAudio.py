import sys
sys.path.append("C:\\Users\\green\\OneDrive\\Documents\\libraries\\ffmpeg-6.1.1-full_build\\bin")

import moviepy.editor as mp
from subprocess import run
import ffmpeg
import os

def getSongNames():
    return [i.split(".")[0] for i in os.listdir("./mp4s")][::-1]

def main():
    
    for name in getSongNames():
        # audio = mp.AudioFileClip(f"./mp3s/{name}.mp3")
        # video = mp.VideoFileClip(f"./mp4s/{name}.mp4")
        # final = video.set_audio(audio)
        # final.write_videofile(f"results/{name}.mp4", codec='mpeg4', audio_codec='libvorbis')
        # run(f"ffmpeg -i ./mp4s/{name}.mp4 -i ./mp3s/{name}.mp3 -shortest -c copy ./results/{name}.mp4")

        input_video = ffmpeg.input(f"./mp4s/{name}.mp4")

        input_audio = ffmpeg.input(f"./mp3s/{name}.mp3")

        ffmpeg.concat(input_video, input_audio, v=1, a=1).output(f'./results/{name}.mp4').run()





if __name__ == "__main__":

    main()