import crypto from "crypto"

const ALGORITHM = "aes-256-gcm"

function getKey(): string {
  const key = process.env.TOKEN_ENCRYPTION_KEY
  if (!key || key.length !== 64) {
    throw new Error("TOKEN_ENCRYPTION_KEY must be a 64-character hex string (32 bytes).")
  }
  return key
}

export function encrypt(text: string): string {
  const ENCRYPTION_KEY = getKey()
  // Generate a random initialization vector
  const iv = crypto.randomBytes(16)

  // Create decipher
  const cipher = crypto.createCipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, "hex"),
    iv
  )
  
  // Encrypt the text
  let encrypted = cipher.update(text, "utf8", "hex")
  encrypted += cipher.final("hex")
  
  // Get the auth tag
  const authTag = cipher.getAuthTag().toString("hex")
  
  // Return the IV, encrypted text, and auth tag delimited by colons
  return `${iv.toString("hex")}:${authTag}:${encrypted}`
}

export function decrypt(encryptedText: string): string {
  const ENCRYPTION_KEY = getKey()
  // Split the string into its parts
  const parts = encryptedText.split(":")
  if (parts.length !== 3) {
    throw new Error("Invalid encrypted string format")
  }

  const [ivHex, authTagHex, encryptedHex] = parts

  const iv = Buffer.from(ivHex, "hex")
  const authTag = Buffer.from(authTagHex, "hex")

  // Create decipher
  const decipher = crypto.createDecipheriv(
    ALGORITHM,
    Buffer.from(ENCRYPTION_KEY, "hex"),
    iv
  )
  
  // Set the auth tag for verification
  decipher.setAuthTag(authTag)
  
  // Decrypt the text
  let decrypted = decipher.update(encryptedHex, "hex", "utf8")
  decrypted += decipher.final("utf8")
  
  return decrypted
}
