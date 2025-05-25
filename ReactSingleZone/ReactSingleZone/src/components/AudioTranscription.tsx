"use client"

import { useState } from "react"

import { Loader2, AlertCircle, FileAudio, Mic } from "lucide-react"
import { Card, CardHeader, CardContent, Typography, Input, Button, Alert, AlertTitle } from "@mui/material"

export default function AudioTranscription() {
  const [audioUrl, setAudioUrl] = useState("")
  const [transcription, setTranscription] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleTranscribe = async () => {
    if (!audioUrl) {
      setError("יש להזין כתובת URL של קובץ אודיו")
      return
    }

    setIsLoading(true)
    setError("")
    setTranscription("")

    try {
      const response = await fetch("/api/ai/transcribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(audioUrl),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(errorText || "שגיאה בתמלול הקובץ")
      }

      const result = await response.text()
      setTranscription(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "שגיאה בתמלול הקובץ")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
      <Card>
        <CardHeader>
          <Typography variant="h5" className="text-2xl">תמלול שירים</Typography>
          <p className="text-muted">הזן כתובת URL של קובץ אודיו לתמלול מילות השיר</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-2 rtl:space-x-reverse">
            <Input
              dir="ltr"
              placeholder="https://example.com/audio.mp3"
              value={audioUrl}
              onChange={(e) => setAudioUrl(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleTranscribe} disabled={isLoading || !audioUrl}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  מתמלל...
                </>
              ) : (
                <>
                  <Mic className="mr-2 h-4 w-4" />
                  תמלל
                </>
              )}
            </Button>
          </div>

          {error && (
            <Alert variant="outlined">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>שגיאה</AlertTitle>
              <p>{error}</p>
            </Alert>
          )}

          {transcription && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2 flex items-center">
                <FileAudio className="mr-2 h-5 w-5" />
                תוצאות התמלול
              </h3>
              <div className="bg-muted p-4 rounded-md whitespace-pre-wrap text-right" dir="rtl">
                {transcription}
              </div>
            </div>
          )}
        </CardContent>
        <div className="text-sm text-muted-foreground">התמלול מתבצע באמצעות OpenAI Whisper API</div>
      </Card>
    </div>
  )
}
