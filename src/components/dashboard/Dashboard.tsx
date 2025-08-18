'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@/contexts/AuthContext'
import { motion } from 'framer-motion'

interface ApiSchema {
  name: string
  description: string
  schemaType: 'openapi' | 'json'
  schemaData: string
}

interface BridgeMapping {
  mappings: Array<{
    source: string
    target: string
    transformation: string
  }>
  workflow: string
  useCases?: string[]
  recommendations?: string[]
}

export function Dashboard() {
  const { user, signOut } = useAuth()
  const [sourceApi, setSourceApi] = useState<ApiSchema | null>(null)
  const [targetApi, setTargetApi] = useState<ApiSchema | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [bridgeMapping, setBridgeMapping] = useState<BridgeMapping | null>(null)

  const handleSchemaUpload = (type: 'source' | 'target', schema: ApiSchema) => {
    if (type === 'source') {
      setSourceApi(schema)
    } else {
      setTargetApi(schema)
    }
  }

  const analyzeSchemas = async () => {
    if (!sourceApi || !targetApi) return
    
    setIsAnalyzing(true)
    
    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sourceSchema: JSON.parse(sourceApi.schemaData),
          targetSchema: JSON.parse(targetApi.schemaData),
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to analyze schemas')
      }

      const result = await response.json()
      setBridgeMapping(result)
    } catch (error) {
      console.error('Error analyzing schemas:', error)
      // Fallback to mock data if API fails
      setBridgeMapping({
        mappings: [
          { source: 'temperature', target: 'event_title', transformation: 'Add "Weather Alert: " prefix' },
          { source: 'condition', target: 'event_description', transformation: 'Map weather condition to description' },
          { source: 'timestamp', target: 'event_time', transformation: 'Convert to calendar format' }
        ],
        workflow: 'When weather API returns high temperature, create calendar event for heat advisory'
      })
    } finally {
      setIsAnalyzing(false)
    }
  }

  const testRun = async () => {
    // Simulate workflow execution
    console.log('Running workflow...')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">AI Bridge</h1>
              <Badge variant="secondary" className="ml-3">Universal API Adapter</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user?.email}</span>
              <Button className='hover:cursor-pointer' variant="outline" onClick={signOut}>
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Source API Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  Source API
                </CardTitle>
                <CardDescription>Upload or paste your source API schema</CardDescription>
              </CardHeader>
              <CardContent>
                <SchemaUploadPanel
                  onSchemaUpload={(schema) => handleSchemaUpload('source', schema)}
                  placeholder="Paste OpenAPI spec or JSON response..."
                />
                {sourceApi && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900">{sourceApi.name}</h4>
                    <p className="text-sm text-blue-700">{sourceApi.description}</p>
                    <Badge variant="outline" className="mt-2">{sourceApi.schemaType}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Bridge Visualization */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <Card className="text-center">
              <CardHeader>
                <CardTitle>AI Bridge</CardTitle>
                <CardDescription>AI-generated connection between APIs</CardDescription>
              </CardHeader>
              <CardContent>
                {sourceApi && targetApi ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <div className="h-0.5 w-8 bg-gray-300"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      <div className="h-0.5 w-8 bg-gray-300"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    
                    {!bridgeMapping ? (
                      <Button 
                        onClick={analyzeSchemas} 
                        disabled={isAnalyzing}
                        className="w-full"
                      >
                        {isAnalyzing ? 'Analyzing...' : 'Generate Bridge'}
                      </Button>
                    ) : (
                      <div className="space-y-3">
                        <div className="text-sm text-gray-600">
                          <p className="font-medium">Field Mappings:</p>
                          {bridgeMapping.mappings.map((mapping, index: number) => (
                            <div key={index} className="text-xs mt-1 p-2 bg-gray-50 rounded">
                              <span className="text-blue-600">{mapping.source}</span>
                              <span className="mx-2">→</span>
                              <span className="text-green-600">{mapping.target}</span>
                            </div>
                          ))}
                        </div>
                        <Button onClick={testRun} className="w-full">
                          Test Run
                        </Button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-gray-400">
                    <p>Upload both APIs to generate bridge</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Target API Panel */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  Target API
                </CardTitle>
                <CardDescription>Upload or paste your target API schema</CardDescription>
              </CardHeader>
              <CardContent>
                <SchemaUploadPanel
                  onSchemaUpload={(schema) => handleSchemaUpload('target', schema)}
                  placeholder="Paste OpenAPI spec or JSON response..."
                />
                {targetApi && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <h4 className="font-medium text-green-900">{targetApi.name}</h4>
                    <p className="text-sm text-green-700">{targetApi.description}</p>
                    <Badge variant="outline" className="mt-2">{targetApi.schemaType}</Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  )
}

interface SchemaUploadPanelProps {
  onSchemaUpload: (schema: ApiSchema) => void
  placeholder: string
}

function SchemaUploadPanel({ onSchemaUpload, placeholder }: SchemaUploadPanelProps) {
  const [schemaData, setSchemaData] = useState('')
  const [schemaName, setSchemaName] = useState('')
  const [schemaDescription, setSchemaDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!schemaData.trim() || !schemaName.trim()) return

    try {
      const parsed = JSON.parse(schemaData)
      const schemaType = parsed.openapi ? 'openapi' : 'json'
      
      onSchemaUpload({
        name: schemaName,
        description: schemaDescription || 'API Schema',
        schemaType,
        schemaData: schemaData
      })
    } catch (error) {
      alert('Invalid JSON format')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="API Name (e.g., Weather API)"
          value={schemaName}
          onChange={(e) => setSchemaName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          required
        />
      </div>
      <div>
        <input
          type="text"
          placeholder="Description (optional)"
          value={schemaDescription}
          onChange={(e) => setSchemaDescription(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
        />
      </div>
      <div>
        <Textarea
          placeholder={placeholder}
          value={schemaData}
          onChange={(e) => setSchemaData(e.target.value)}
          className="min-h-[120px] text-sm"
          required
        />
      </div>
      <Button type="submit" className="w-full" size="sm">
        Upload Schema
      </Button>
    </form>
  )
}
