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
        video = mp.VideoFileClip(f"./mp4s/{name}.webm")
        # final = video.set_audio(audio)
        # final.write_videofile(f"results/{name}.webm", codec='mp4', audio_codec='libvorbis')
        # ffmpeg -i your_video_file.avi -i your_audio_file.wav -vcodec copy -acodec copy muxed_file.avi
        # run(f"ffmpeg -i .mp4s/{name}.mp4 -i ./mp3s/{name}.mp3 -vcodec copy -acodec copy ./results/{name}.mp4")

        # input_video = ffmpeg.input(f"./mp4s/{name}.webm")

        # input_audio = ffmpeg.input(f"./mp3s/{name}.mp3")

        # out = ffmpeg.output(input_audio.audio.filter("aecho", 0.8, 0.9, 1000, 0.3), input_video.video.hflip(), 'out.mp4')
        # ffmpeg.input(video_input).output(audio_input, vcodec='copy', acodec='aac', strict='experimental').overwrite_output().run(output_file)  
        # input_video.output(f"./mp3s/{name}.mp3", vcodec='copy', acodec='aac', strict='experimental').overwrite_output().run(f'./results/{name}.mp4')

        # ffmpeg.concat(input_video, input_audio, v=1, a=1).output(f'./results/{name}.mp4').run()





if __name__ == "__main__":

    main()