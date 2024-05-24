import cv2
import time
import uuid

class VideoConverter:
    def __init__(self, video_path):
        self.video_path = video_path
        self.cap = cv2.VideoCapture(video_path)
        self.count = 0
        self.last = time.perf_counter()

    def process_frames(self):
        while self.cap.isOpened():
            ret, frame = self.cap.read()
            if ret:
                if time.perf_counter() - self.last > 0.5:
                    self.count += 1
                    img_name = f"{str(uuid.uuid4())}.png"
                    cv2.imwrite(f'/home//rossilodataset/{img_name}', frame)
                    self.last = time.perf_counter()
            else:
                break

        self.cap.release()

def main():
    video_path = "/path/to/your/video.mp4"
    converter = VideoConverter(video_path)
    converter.process_frames()

if __name__ == '__main__':
    main()
