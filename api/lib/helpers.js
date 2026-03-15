export function sendResponse(res, statusCode, data, error) {
const response = {
success: !error,
data: error ? undefined : data,
error: error || undefined
}

res.statusCode = statusCode
res.setHeader("Content-Type", "application/json")
res.end(JSON.stringify(response))
}

export function validateEmail(email) {
const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/
return emailRegex.test(email)
}

export function generateIssueId() {
return `CR-${Date.now().toString().slice(-6)}`
}

export function generatePostId() {
return `POST-${Date.now().toString().slice(-6)}`
}

export function getAdminCredentials() {
return {
username: process.env.ADMIN_USERNAME || "admin",
password: process.env.ADMIN_PASSWORD || "admin123"
}
}
