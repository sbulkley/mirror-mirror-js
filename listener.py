from subprocess import call
import serial
ser = serial.Serial('/dev/ttyACM0', 9600)
while True:
  msg = ser.readline()
  msg = msg[0] - 48
  if msg == 0:
    call(["xdotool", "mousemove", "50", "50"])
    call(["xdotool", "click", "1"])
  elif msg == 1:
    call(["xdotool", "mousemove", "140", "50"])
    call(["xdotool", "click", "1"])
  elif msg == 2:
    call(["xdotool", "mousemove", "220", "50"])
    call(["xdotool", "click", "1"])
  elif msg == 3:
    call(["xdotool", "mousemove", "310", "50"])
    call(["xdotool", "click", "1"])
  elif msg == 4:
    call(["xdotool", "mousemove", "450", "50"])
    call(["xdotool", "click", "1"])
  elif msg == 5:
    call(["xdotool", "mousemove", "530", "50"])
    call(["xdotool", "click", "1"])
  elif msg == 6:
    call(["xdotool", "mousemove", "630", "50"])
    call(["xdotool", "click", "1"])
