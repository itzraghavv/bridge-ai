export const sampleWeatherApi = {
  name: "Weather API",
  description: "OpenWeatherMap API for current weather data",
  schemaType: "openapi" as const,
  schemaData: JSON.stringify({
    openapi: "3.0.0",
    info: {
      title: "Weather API",
      version: "1.0.0",
      description: "Current weather data API"
    },
    paths: {
      "/weather": {
        get: {
          summary: "Get current weather",
          responses: {
            "200": {
              description: "Weather data",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      temperature: {
                        type: "number",
                        description: "Temperature in Celsius"
                      },
                      condition: {
                        type: "string",
                        description: "Weather condition (sunny, rainy, etc.)"
                      },
                      humidity: {
                        type: "number",
                        description: "Humidity percentage"
                      },
                      timestamp: {
                        type: "string",
                        format: "date-time",
                        description: "When the data was recorded"
                      },
                      location: {
                        type: "string",
                        description: "City name"
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }, null, 2)
}

export const sampleCalendarApi = {
  name: "Calendar API",
  description: "Google Calendar API for event management",
  schemaType: "openapi" as const,
  schemaData: JSON.stringify({
    openapi: "3.0.0",
    info: {
      title: "Calendar API",
      version: "1.0.0",
      description: "Calendar event management API"
    },
    paths: {
      "/events": {
        post: {
          summary: "Create a new event",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["event_title", "event_time"],
                  properties: {
                    event_title: {
                      type: "string",
                      description: "Title of the event"
                    },
                    event_description: {
                      type: "string",
                      description: "Description of the event"
                    },
                    event_time: {
                      type: "string",
                      format: "date-time",
                      description: "When the event occurs"
                    },
                    duration: {
                      type: "number",
                      description: "Duration in minutes"
                    },
                    location: {
                      type: "string",
                      description: "Event location"
                    }
                  }
                }
              }
            }
          },
          responses: {
            "201": {
              description: "Event created successfully"
            }
          }
        }
      }
    }
  }, null, 2)
}

export const sampleJsonResponse = {
  name: "Sample JSON Response",
  description: "Example JSON response for testing",
  schemaType: "json" as const,
  schemaData: JSON.stringify({
    "user_id": 12345,
    "status": "active",
    "preferences": {
      "theme": "dark",
      "notifications": true
    },
    "last_login": "2024-01-15T10:30:00Z"
  }, null, 2)
}
