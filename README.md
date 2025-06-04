# Average Calculator Microservice 🧮

A simple REST API that fetches different types of numbers and calculates rolling averages. Built with Next.js and designed to be fast and reliable.

## What does it do?

This service fetches numbers from external APIs and keeps track of them in a "sliding window" - think of it like a queue that only remembers the last 10 numbers. It calculates the average of these numbers and shows you what changed with each request.

## Quick Start

1. **Install and run**
   ```bash
   npm install
   npm run dev
   ```

2. **Open your browser**
   Go to `http://localhost:3000` and start testing!

## API Endpoints

Just hit these URLs to get different types of numbers:

- `/api/numbers/p` - Prime numbers (2, 3, 5, 7, 11...)
- `/api/numbers/f` - Fibonacci numbers (1, 1, 2, 3, 5, 8...)
- `/api/numbers/e` - Even numbers (2, 4, 6, 8, 10...)
- `/api/numbers/r` - Random numbers

## Example Response

```json
{
  "windowPrevState": [2, 4, 6],
  "windowCurrState": [2, 4, 6, 8, 10],
  "numbers": [8, 10],
  "avg": "6.00"
}
```

- **windowPrevState**: What numbers were stored before
- **windowCurrState**: What numbers are stored now
- **numbers**: The new numbers we just got
- **avg**: Average of all current numbers

## How to Use

### Option 1: Web Interface (Easiest)
1. Go to `http://localhost:3000`
2. Click the test buttons to try different number types
3. Or visit `http://localhost:3000/dashboard` for a detailed view

### Option 2: Direct API Calls
```bash
# Get some prime numbers
curl http://localhost:3000/api/numbers/p

# Get even numbers
curl http://localhost:3000/api/numbers/e
```

## Key Features

- **Smart Storage**: Only keeps unique numbers, no duplicates
- **Rolling Window**: Remembers only the last 10 numbers (configurable)
- **Fast & Reliable**: 500ms timeout on external calls, won't hang
- **Error Handling**: Keeps working even if external APIs fail
- **Real-time Dashboard**: See everything happening in your browser

## Configuration

Want to change the window size? Edit this line in `app/api/numbers/[numberid]/route.ts`:

```typescript
const numberStore = new NumberStore(10) // Change 10 to whatever you want
```

## Troubleshooting

**Port 3000 already in use?**
```bash
lsof -ti:3000 | xargs kill -9
npm run dev
```

**API not responding?**
- Check if you can access `http://localhost:3000`
- Look at the console for error messages
- The external number APIs might be down (that's okay, the service will still work)

**Getting weird responses?**
- Make sure you're using `p`, `f`, `e`, or `r` as the number type
- Check the browser console for any errors
