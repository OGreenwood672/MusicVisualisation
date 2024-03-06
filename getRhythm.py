
import librosa
import os
import json

def getSongOnset(songNames):
    songs = dict()
    for songName in songNames:
        y, sr = librosa.load(f"./mp3s/{songName}") #Can add offset
        songs[songName] = list(librosa.onset.onset_detect(y=y, sr=sr, units="time"))
    return songs

def getSongNames():
    return list(os.listdir("./mp3s"))

def save(onset):
    with open("./songs.json", "w") as f:
        json.dump(onset, f, indent=4)


def main():

    songNames = getSongNames()
    onsets = getSongOnset(songNames)
    save(onsets)


if __name__ == "__main__":
    main()