import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { PasswordStrength } from '../PasswordStrength';

describe('PasswordStrength', () => {
  describe('rendering', () => {
    it('should render nothing when password is empty', () => {
      const { container } = render(<PasswordStrength password="" />);

      expect(container.firstChild).toBeNull();
    });

    it('should render strength indicator for non-empty password', () => {
      render(<PasswordStrength password="test" />);

      expect(screen.getByText(/password strength/i)).toBeInTheDocument();
    });

    it('should render requirements checklist', () => {
      render(<PasswordStrength password="test" />);

      expect(screen.getByText(/at least 8 characters/i)).toBeInTheDocument();
      expect(screen.getByText(/contains a letter/i)).toBeInTheDocument();
      expect(screen.getByText(/contains a number/i)).toBeInTheDocument();
      expect(
        screen.getByText(/contains a special character/i)
      ).toBeInTheDocument();
    });
  });

  describe('password strength calculation', () => {
    it('should show weak for password with only 1 requirement', () => {
      render(<PasswordStrength password="12345678" />);

      expect(screen.getByText(/weak/i)).toBeInTheDocument();
    });

    it('should show strong for password with all 4 requirements', () => {
      render(<PasswordStrength password="Test1234!" />);

      expect(screen.getByText(/strong/i)).toBeInTheDocument();
    });
  });

  describe('requirement checks', () => {
    it('should show check mark for met requirements', () => {
      render(<PasswordStrength password="Test1234!" />);

      const checkMarks = screen.getAllByText('✓');
      expect(checkMarks).toHaveLength(4);
    });

    it('should show circle for unmet requirements', () => {
      render(<PasswordStrength password="test" />);

      const circles = screen.getAllByText('○');
      expect(circles.length).toBeGreaterThan(0);
    });

    it('should highlight met requirements in green', () => {
      const { container } = render(<PasswordStrength password="Test1234!" />);

      const requirementsList = container.querySelectorAll('li.text-green-600');
      expect(requirementsList.length).toBe(4);
    });

    it('should show unmet requirements in gray', () => {
      const { container } = render(<PasswordStrength password="test" />);

      const requirementsList = container.querySelectorAll('li.text-gray-500');
      expect(requirementsList.length).toBeGreaterThan(0);
    });
  });

  describe('edge cases', () => {
    it('should handle password with mixed case letters', () => {
      render(<PasswordStrength password="TestTest" />);

      expect(screen.getByText(/contains a letter/i).closest('li')).toHaveClass(
        'text-green-600'
      );
    });

    it('should handle very long passwords', () => {
      const longPassword = 'A'.repeat(100) + '1!';

      render(<PasswordStrength password={longPassword} />);

      expect(screen.getByText(/strong/i)).toBeInTheDocument();
    });

    it('should handle password with spaces', () => {
      render(<PasswordStrength password="Test 123!" />);

      expect(screen.getByText(/strong/i)).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should use semantic list markup', () => {
      const { container } = render(<PasswordStrength password="test" />);

      const list = container.querySelector('ul');
      expect(list).toBeInTheDocument();
    });
  });
});
