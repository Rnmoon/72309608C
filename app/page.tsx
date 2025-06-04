import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-4xl font-bold mb-6">Average Calculator Microservice</h1>
      <p className="text-lg mb-8">A REST API that fetches and calculates averages for different types of numbers.</p>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>API Endpoints</CardTitle>
            <CardDescription>Available number types</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">Prime Numbers</h3>
              <code className="block bg-muted p-2 rounded-md">/api/numbers/p</code>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Fibonacci Numbers</h3>
              <code className="block bg-muted p-2 rounded-md">/api/numbers/f</code>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Even Numbers</h3>
              <code className="block bg-muted p-2 rounded-md">/api/numbers/e</code>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Random Numbers</h3>
              <code className="block bg-muted p-2 rounded-md">/api/numbers/r</code>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test the API</CardTitle>
            <CardDescription>Click the buttons to test each endpoint</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/api/numbers/p" target="_blank">
              <Button className="w-full">Test Prime Numbers</Button>
            </Link>
            <Link href="/api/numbers/f" target="_blank">
              <Button className="w-full">Test Fibonacci Numbers</Button>
            </Link>
            <Link href="/api/numbers/e" target="_blank">
              <Button className="w-full">Test Even Numbers</Button>
            </Link>
            <Link href="/api/numbers/r" target="_blank">
              <Button className="w-full">Test Random Numbers</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
