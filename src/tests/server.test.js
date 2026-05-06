import { describe, it, expect, vi } from 'vitest';
import request from 'supertest';
import { app } from '../../server';

// Mock OpenAI correctly as a constructor
vi.mock('openai', () => {
  return {
    default: function() {
      return {
        chat: {
          completions: {
            create: vi.fn().mockResolvedValue({
              choices: [{ message: { content: JSON.stringify({ targetCalories: 2000, targetProtein: 150, targetCarbs: 200, targetFats: 70 }) } }]
            })
          }
        }
      };
    }
  };
});

describe('Backend API Endpoints', () => {
  it('POST /api/calcular-macros should return calculated macros', async () => {
    const profileData = {
      gender: 'Male',
      age: 30,
      weight: 80,
      height: 180,
      goal: 'Lose Weight',
      lifestyle: 'Active'
    };

    const response = await request(app)
      .post('/api/calcular-macros')
      .send(profileData)
      .set('Accept', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('targetCalories');
    expect(response.body).toHaveProperty('targetProtein');
  });

  it('POST /api/analizar-comida should return 400 if no image is provided', async () => {
    const response = await request(app)
      .post('/api/analizar-comida')
      .send({});
    
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('No image provided.');
  });
});
