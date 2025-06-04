"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ApiResponse {
  windowPrevState: number[]
  windowCurrState: number[]
  numbers: number[]
  avg: string
  error?: string
}

export default function Dashboard() {
  const [responses, setResponses] = useState<{
    [key: string]: ApiResponse | null
  }>({
    p: null,
    f: null,
    e: null,
    r: null,
  })
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({
    p: false,
    f: false,
    e: false,
    r: false,
  })

  const fetchNumbers = async (type: string) => {
    setLoading((prev) => ({ ...prev, [type]: true }))
    try {
      const response = await fetch(`/api/numbers/${type}`)
      const data = await response.json()
      setResponses((prev) => ({ ...prev, [type]: data }))
    } catch (error) {
      console.error(`Error fetching ${type} numbers:`, error)
      setResponses((prev) => ({
        ...prev,
        [type]: { error: "Failed to fetch data", windowPrevState: [], windowCurrState: [], numbers: [], avg: "0.00" },
      }))
    } finally {
      setLoading((prev) => ({ ...prev, [type]: false }))
    }
  }

  const numberTypes = [
    { id: "p", name: "Prime" },
    { id: "f", name: "Fibonacci" },
    { id: "e", name: "Even" },
    { id: "r", name: "Random" },
  ]

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Number API Dashboard</h1>

      <Tabs defaultValue="p" className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          {numberTypes.map((type) => (
            <TabsTrigger key={type.id} value={type.id}>
              {type.name} Numbers
            </TabsTrigger>
          ))}
        </TabsList>

        {numberTypes.map((type) => (
          <TabsContent key={type.id} value={type.id} className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">{type.name} Numbers</h2>
              <Button onClick={() => fetchNumbers(type.id)} disabled={loading[type.id]}>
                {loading[type.id] ? "Loading..." : "Fetch Numbers"}
              </Button>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>API Response</CardTitle>
              </CardHeader>
              <CardContent>
                {responses[type.id] ? (
                  responses[type.id]?.error ? (
                    <div className="text-red-500">{responses[type.id]?.error}</div>
                  ) : (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-medium mb-1">Previous Window State:</h3>
                        <div className="bg-muted p-3 rounded-md overflow-x-auto">
                          <code>{JSON.stringify(responses[type.id]?.windowPrevState || [])}</code>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Current Window State:</h3>
                        <div className="bg-muted p-3 rounded-md overflow-x-auto">
                          <code>{JSON.stringify(responses[type.id]?.windowCurrState || [])}</code>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Numbers from API:</h3>
                        <div className="bg-muted p-3 rounded-md overflow-x-auto">
                          <code>{JSON.stringify(responses[type.id]?.numbers || [])}</code>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-medium mb-1">Average:</h3>
                        <div className="text-2xl font-bold">{responses[type.id]?.avg}</div>
                      </div>
                    </div>
                  )
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    Click &quot;Fetch Numbers&quot; to see the response
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
