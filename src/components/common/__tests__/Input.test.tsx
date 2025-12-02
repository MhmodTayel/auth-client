import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';

describe('Input', () => {
  describe('rendering', () => {
    it('should render input field', () => {
      render(<Input />);

      expect(screen.getByRole('textbox')).toBeInTheDocument();
    });

    it('should render with label', () => {
      render(<Input label="Email" id="email" />);

      expect(screen.getByLabelText('Email')).toBeInTheDocument();
    });

    it('should show required indicator when required', () => {
      render(<Input label="Email" id="email" required />);

      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('should render with placeholder', () => {
      render(<Input placeholder="Enter email" />);

      expect(screen.getByPlaceholderText('Enter email')).toBeInTheDocument();
    });

    it('should render with custom className', () => {
      render(<Input className="custom-class" />);

      expect(screen.getByRole('textbox')).toHaveClass('custom-class');
    });
  });

  describe('types', () => {
    it('should render text input by default', () => {
      render(<Input />);

      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('should render email input', () => {
      render(<Input type="email" />);

      expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email');
    });

    it('should render password input', () => {
      const { container } = render(<Input type="password" id="password" />);

      const input = container.querySelector('input[type="password"]');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'password');
    });
  });

  describe('password toggle', () => {
    it('should show password toggle button when showPasswordToggle is true', () => {
      render(<Input type="password" showPasswordToggle />);

      expect(
        screen.getByRole('button', { name: /show password/i })
      ).toBeInTheDocument();
    });

    it('should toggle password visibility', async () => {
      const user = userEvent.setup();
      const { container } = render(
        <Input type="password" showPasswordToggle id="password" />
      );

      const input = container.querySelector('input') as HTMLInputElement;
      const toggleButton = screen.getByRole('button', {
        name: /show password/i,
      });

      // Initially password type
      expect(input).toHaveAttribute('type', 'password');

      // Click to show
      await user.click(toggleButton);
      expect(input).toHaveAttribute('type', 'text');
      expect(
        screen.getByRole('button', { name: /hide password/i })
      ).toBeInTheDocument();

      // Click to hide
      await user.click(toggleButton);
      expect(input).toHaveAttribute('type', 'password');
    });

    it('should not show toggle button when showPasswordToggle is false', () => {
      render(<Input type="password" />);

      expect(
        screen.queryByRole('button', { name: /show password/i })
      ).not.toBeInTheDocument();
    });
  });

  describe('error states', () => {
    it('should display error message', () => {
      render(<Input id="email" error="Invalid email" />);

      expect(screen.getByText('Invalid email')).toBeInTheDocument();
    });

    it('should apply error styling when error exists', () => {
      render(<Input error="Error message" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('border-red-500');
    });

    it('should set aria-invalid when error exists', () => {
      render(<Input error="Error message" />);

      expect(screen.getByRole('textbox')).toHaveAttribute(
        'aria-invalid',
        'true'
      );
    });

    it('should link error message with aria-describedby', () => {
      render(<Input id="email" error="Error message" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'email-error');
    });

    it('should have alert role on error message', () => {
      render(<Input id="email" error="Error message" />);

      const errorMessage = screen.getByText('Error message');
      expect(errorMessage).toHaveAttribute('role', 'alert');
    });
  });

  describe('helper text', () => {
    it('should display helper text', () => {
      render(<Input helperText="Enter your email address" />);

      expect(screen.getByText('Enter your email address')).toBeInTheDocument();
    });

    it('should not show helper text when error exists', () => {
      render(
        <Input helperText="Helper text" error="Error message" id="test-input" />
      );

      expect(screen.queryByText('Helper text')).not.toBeInTheDocument();
      expect(screen.getByText('Error message')).toBeInTheDocument();
    });

    it('should link helper text with aria-describedby', () => {
      render(<Input id="email" helperText="Helper text" />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-describedby', 'email-helper');
    });
  });

  describe('disabled state', () => {
    it('should be disabled when disabled prop is true', () => {
      render(<Input disabled />);

      expect(screen.getByRole('textbox')).toBeDisabled();
    });

    it('should apply disabled styling', () => {
      render(<Input disabled />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveClass('disabled:bg-gray-100');
      expect(input).toHaveClass('disabled:cursor-not-allowed');
    });
  });

  describe('interactions', () => {
    it('should handle onChange event', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(handleChange).toHaveBeenCalled();
    });

    it('should update value on user input', async () => {
      const user = userEvent.setup();

      render(<Input />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      await user.type(input, 'test value');

      expect(input.value).toBe('test value');
    });

    it('should not accept input when disabled', async () => {
      const handleChange = vi.fn();
      const user = userEvent.setup();

      render(<Input disabled onChange={handleChange} />);

      const input = screen.getByRole('textbox');
      await user.type(input, 'test');

      expect(handleChange).not.toHaveBeenCalled();
    });
  });

  describe('autoComplete', () => {
    it('should set autoComplete attribute', () => {
      render(<Input autoComplete="email" />);

      expect(screen.getByRole('textbox')).toHaveAttribute(
        'autocomplete',
        'email'
      );
    });
  });

  describe('accessibility', () => {
    it('should be keyboard accessible', async () => {
      const user = userEvent.setup();

      render(<Input />);

      const input = screen.getByRole('textbox');
      input.focus();

      await user.keyboard('test');

      expect(input).toHaveValue('test');
    });

    it('should have proper label association', () => {
      render(<Input label="Email" id="email" />);

      const input = screen.getByLabelText('Email');
      expect(input).toHaveAttribute('id', 'email');
    });

    it('should support screen readers with aria attributes', () => {
      render(<Input id="email" error="Error" label="Email" required />);

      const input = screen.getByRole('textbox');
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAttribute('aria-describedby', 'email-error');
      expect(input).toHaveAttribute('required');
    });
  });

  describe('edge cases', () => {
    it('should handle empty string value', async () => {
      const user = userEvent.setup();

      render(<Input />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      await user.type(input, 'test');
      await user.clear(input);

      expect(input.value).toBe('');
    });

    it('should handle special characters', async () => {
      const user = userEvent.setup();

      render(<Input />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      await user.type(input, '!@#$%^&*()');

      expect(input.value).toBe('!@#$%^&*()');
    });

    it('should handle long text input', async () => {
      const user = userEvent.setup();
      const longText = 'a'.repeat(1000);

      render(<Input />);

      const input = screen.getByRole('textbox') as HTMLInputElement;
      await user.type(input, longText);

      expect(input.value).toBe(longText);
    });
  });
});
