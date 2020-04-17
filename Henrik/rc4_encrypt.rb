require 'numo/narray'
include Numo


def KSA(key)
  keylength = key.length
  s = Array.new(256)
  (0..255).each do |i|
    s[i] = i
  end
  j = 0
  (0..255).each do |i|
      j = (j + s[i] + key[i % keylength]) % 256
      s[i], s[j] = s[j], s[i]  # swap
  end
  return s
end

def PRGA(s, n)
  i = 0
  j = 0
  key = []
  while n>0
    n = n - 1
    i = (i + 1) % 256
    #puts i
    j = (j + s[i]) % 256
    #puts j
    s[i], s[j] = s[j], s[i]  # swap
    k = s[(s[i] + s[j]) % 256]
    #print k
    key.push(k)
  end
  #print key
  return key
end

def RC4(key, n)
  s = KSA(key)
  #print s
  return PRGA(s,n)
end

def convert(key)
  a = []
  key = key.split('')
  key.each{ |c|
    a.push(c.ord)
  }
  return a
end

def start()
  # ciphertext should be BBF316E8D940AF0AD3
    plaintext = 'Plaintext'
    key = 'Key'
    # ciphertext should be 1021BF0420
    #key = 'Wiki'
    #plaintext = 'pedia'
    # ciphertext should be 45A01F645FC35B383552544B9BF5
    #key = 'Secret'
    #plaintext = 'Attack at dawn'
  key = convert(key)
  #puts key
  keystream = Int32[*RC4(key, plaintext.length)]
  #puts keystream
  #puts plaintext
  plaintext = Int32[*convert(plaintext)]
  #puts keystream
   cipher = plaintext ^ keystream
   cipher = cipher.to_a
   print cipher
   cipher.each{ |c|
     print c.to_s(16)
   }
end
start()
