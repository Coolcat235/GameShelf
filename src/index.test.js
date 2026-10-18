import test from 'node:test';
import assert from 'node:assert/strict';

import { getStarterMessage } from './index.js';

test('starter message uses the provided name', () => {
  assert.equal(getStarterMessage('Ada'), 'Hello, Ada! Your Node starter app is running.');
});

test('starter message defaults to friend', () => {
  assert.equal(getStarterMessage(), 'Hello, friend! Your Node starter app is running.');
});
