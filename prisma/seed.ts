import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create a sample user
  const user = await prisma.user.upsert({
    where: { email: 'demo@bridge-ai.com' },
    update: {},
    create: {
      email: 'demo@bridge-ai.com',
      name: 'Demo User',
    },
  })

  console.log('✅ Created user:', user.email)

  // Create sample API schemas
  const weatherApi = await prisma.apiSchema.upsert({
    where: { id: 'weather-api-demo' },
    update: {},
    create: {
      id: 'weather-api-demo',
      name: 'Weather API',
      description: 'OpenWeatherMap API for current weather data',
      schemaType: 'openapi',
      schemaData: {
        openapi: '3.0.0',
        info: {
          title: 'Weather API',
          version: '1.0.0',
          description: 'Current weather data API'
        },
        paths: {
          '/weather': {
            get: {
              summary: 'Get current weather',
              responses: {
                '200': {
                  description: 'Weather data',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: {
                          temperature: {
                            type: 'number',
                            description: 'Temperature in Celsius'
                          },
                          condition: {
                            type: 'string',
                            description: 'Weather condition (sunny, rainy, etc.)'
                          },
                          humidity: {
                            type: 'number',
                            description: 'Humidity percentage'
                          },
                          timestamp: {
                            type: 'string',
                            format: 'date-time',
                            description: 'When the data was recorded'
                          },
                          location: {
                            type: 'string',
                            description: 'City name'
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
      },
      userId: user.id,
    },
  })

  const calendarApi = await prisma.apiSchema.upsert({
    where: { id: 'calendar-api-demo' },
    update: {},
    create: {
      id: 'calendar-api-demo',
      name: 'Calendar API',
      description: 'Google Calendar API for event management',
      schemaType: 'openapi',
      schemaData: {
        openapi: '3.0.0',
        info: {
          title: 'Calendar API',
          version: '1.0.0',
          description: 'Calendar event management API'
        },
        paths: {
          '/events': {
            post: {
              summary: 'Create a new event',
              requestBody: {
                required: true,
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      required: ['event_title', 'event_time'],
                      properties: {
                        event_title: {
                          type: 'string',
                          description: 'Title of the event'
                        },
                        event_description: {
                          type: 'string',
                          description: 'Description of the event'
                        },
                        event_time: {
                          type: 'string',
                          format: 'date-time',
                          description: 'When the event occurs'
                        },
                        duration: {
                          type: 'number',
                          description: 'Duration in minutes'
                        },
                        location: {
                          type: 'string',
                          description: 'Event location'
                        }
                      }
                    }
                  }
                }
              },
              responses: {
                '201': {
                  description: 'Event created successfully'
                }
              }
            }
          }
        }
      },
      userId: user.id,
    },
  })

  console.log('✅ Created API schemas:', weatherApi.name, 'and', calendarApi.name)

  // Create a sample workflow
  const workflow = await prisma.workflow.upsert({
    where: { id: 'weather-to-calendar-demo' },
    update: {},
    create: {
      id: 'weather-to-calendar-demo',
      name: 'Weather Alert to Calendar',
      description: 'Automatically create calendar events for weather alerts',
      sourceApiId: weatherApi.id,
      targetApiId: calendarApi.id,
      mapping: {
        mappings: [
          {
            source: 'temperature',
            target: 'event_title',
            transformation: 'Add "Weather Alert: " prefix when temperature > 30°C'
          },
          {
            source: 'condition',
            target: 'event_description',
            transformation: 'Map weather condition to description'
          },
          {
            source: 'timestamp',
            target: 'event_time',
            transformation: 'Convert to calendar format'
          },
          {
            source: 'location',
            target: 'location',
            transformation: 'Direct mapping'
          }
        ]
      },
      workflowPlan: {
        trigger: 'When weather API returns temperature > 30°C',
        action: 'Create calendar event with heat advisory',
        schedule: 'Real-time monitoring',
        conditions: ['temperature > 30', 'condition includes "sunny" or "clear"']
      },
      isActive: false,
      userId: user.id,
    },
  })

  console.log('✅ Created workflow:', workflow.name)

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
