import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { type Toast } from '@/core/store/types/toast.type';
import { Alert, Toaster } from './Toaster';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import Button from '../Button';
import type { Meta, StoryObj } from '@storybook/react-vite';

const mockToastSlice = createSlice({
  name: 'toast',
  initialState: { toasts: [] as Toast[] },
  reducers: {
    addToast: (state, action) => {
      state.toasts.push({ ...action.payload, id: Math.random().toString(36).substr(2, 9) });
    },
    removeToast: (state, action) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
  },
});

const mockStore = (preloadedState = {}) =>
  configureStore({
    reducer: { toast: mockToastSlice.reducer },
    preloadedState,
  });

const withRedux = (Story, context) => {
  const store = mockStore({ toast: { toasts: context.parameters.initialToasts || [] } });
  return (
    <Provider store={store}>
      <Story />
    </Provider>
  );
};

const meta: Meta<typeof Alert> = {
  title: 'Components/ui/Toaster',
  component: Toaster,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [withRedux],
  argTypes: {
    title: {
      control: 'text',
    },
    subtitle: {
      control: 'text',
    },
    hasClose: { control: 'boolean' },
    className: { control: 'text' },
    radius: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'full'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'success', 'warning', 'danger'],
    },
    action: { control: false },
    onComplete: { control: false },
    onClick: { action: '' },
    position: {
      control: 'select',
      options: [
        'top-left',
        'top-right',
        'top-center',
        'bottom-left',
        'bottom-right',
        'bottom-center',
      ],
    },
  },

  beforeEach: () => {
    gsap.registerPlugin(useGSAP);
  },
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const ToastStory: Story = {
  render: (args) => {
    const store = mockStore();
    const addToast = () => store.dispatch(mockToastSlice.actions.addToast(args));

    return (
      <Provider store={store}>
        <div className="p-4">
          <Button onClick={addToast}>Add Toast</Button>
        </div>
        <Toaster position={args.position} />
      </Provider>
    );
  },
  args: {
    position: 'top-center',
    hasClose: true,
    className: '',
    color: 'primary',
    title: 'Toast',
    subtitle: 'this is a sample toast',
    radius: 'lg',
    duration: 6000,
  },
  parameters: {
    initialToasts: [],
  },
};
