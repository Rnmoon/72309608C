import { type NextRequest, NextResponse } from "next/server"
import { NumberStore } from "@/lib/number-store"

// Initialize the number store with a window size of 10
const numberStore = new NumberStore(10)

// Use your provided access token directly
const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ5MDE4MTA2LCJpYXQiOjE3NDkwMTc4MDYsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImFjM2NiYzY1LTlmYWQtNDEwYi1iY2VkLWUyODY5MTYzZWJjOCIsInN1YiI6ImFyeWFuc3VuaWxtb29uQGdtYWlsLmNvbSJ9LCJlbWFpbCI6ImFyeWFuc3VuaWxtb29uQGdtYWlsLmNvbSIsIm5hbWUiOiJhcnlhbiBtb29uIiwicm9sbE5vIjoiNzIzMDk2MDhjIiwiYWNjZXNzQ29kZSI6IktSalVVVSIsImNsaWVudElEIjoiYWMzY2JjNjUtOWZhZC00MTBiLWJjZWQtZTI4NjkxNjNlYmM4IiwiY2xpZW50U2VjcmV0IjoiRkF3RVdQald0QlduUWFxdyJ9.cy_f4AlemwfmEf8qWGGnuH2Vkz219Pt2s4rWTdWwf4o";

export async function GET(request: NextRequest, context: { params: { numberid: string } }) {
  const numberid = context.params.numberid

  // Validate the number ID
  if (!["p", "f", "e", "r"].includes(numberid)) {
    return NextResponse.json({ error: "Invalid number ID. Use 'p', 'f', 'e', or 'r'." }, { status: 400 })
  }

  try {
    // Get the previous state before fetching new numbers
    const windowPrevState = [...numberStore.getNumbers()]

    // Fetch numbers from the third-party API based on the number ID
    const apiUrl = getApiUrlForNumberType(numberid)

    // Fetch with timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 500)

    try {
      const response = await fetch(apiUrl, {
        signal: controller.signal,
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      clearTimeout(timeoutId)

      const data = await response.json()
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}, message: ${data.message || ''}`)
      }

      const numbers = data.numbers
      if (!numbers || !Array.isArray(numbers) || numbers.length === 0) {
        console.warn('No numbers returned from API:', data)
      }

      // Add the numbers to the store
      numbers.forEach((num: number) => {
        numberStore.addNumber(num)
      })
    } catch (error) {
      // If fetch fails or times out, continue with current state
      console.error("Error fetching numbers:", error)
    }

    // Get the current state after fetching and adding new numbers
    const windowCurrState = [...numberStore.getNumbers()]

    // Calculate the average
    const avg = numberStore.getAverage()

    // Prepare the response
    const responseData = {
      windowPrevState,
      windowCurrState,
      numbers: windowCurrState,
      avg: avg.toFixed(2),
    }

    return NextResponse.json(responseData)
  } catch (error) {
    console.error("Error processing request:", error)
    return NextResponse.json({ error: "An error occurred while processing your request." }, { status: 500 })
  }
}

function getApiUrlForNumberType(numberType: string): string {
  const baseUrl = "http://20.244.56.144/evaluation-service"

  switch (numberType) {
    case "p":
      return `${baseUrl}/primes`
    case "f":
      return `${baseUrl}/fibo`
    case "e":
      return `${baseUrl}/even`
    case "r":
      return `${baseUrl}/rand`
    default:
      throw new Error(`Invalid number type: ${numberType}`)
  }
}
