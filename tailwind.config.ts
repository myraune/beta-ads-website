
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-subtle': 'var(--gradient-subtle)',
				'gradient-card': 'var(--gradient-card)',
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'scroll': {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-20px)' }
				},
				'blob': {
					'0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
					'33%': { transform: 'translate(30px, -50px) scale(1.1)' },
					'66%': { transform: 'translate(-20px, 20px) scale(0.9)' }
				},
				'drift': {
					'0%, 100%': { transform: 'translate(0px, 0px)' },
					'50%': { transform: 'translate(50px, 30px)' }
				},
				'slideRight': {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' }
				},
				'slideLeft': {
					'0%': { transform: 'translateX(100%)' },
					'100%': { transform: 'translateX(-100%)' }
				},
				'glitch-main': {
					'0%, 100%': { 
						transform: 'translate(0, 0) scale(1)',
						opacity: '1'
					},
					'20%': { 
						transform: 'translate(-2px, 2px) scale(1.01)',
						opacity: '0.9'
					},
					'40%': { 
						transform: 'translate(2px, -2px) scale(0.99)',
						opacity: '1'
					},
					'60%': { 
						transform: 'translate(-1px, -1px) scale(1.02)',
						opacity: '0.95'
					},
					'80%': { 
						transform: 'translate(1px, 1px) scale(0.98)',
						opacity: '1'
					}
				},
				'glitch-red': {
					'0%, 100%': { transform: 'translate(0, 0)' },
					'33%': { transform: 'translate(-3px, 0)' },
					'66%': { transform: 'translate(3px, 0)' }
				},
				'glitch-blue': {
					'0%, 100%': { transform: 'translate(0, 0)' },
					'33%': { transform: 'translate(3px, 0)' },
					'66%': { transform: 'translate(-3px, 0)' }
				},
				'scan': {
					'0%': { transform: 'translateY(-100%)' },
					'100%': { transform: 'translateY(100%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'scroll': 'scroll 20s linear infinite',
				'float': 'float 6s ease-in-out infinite',
				'blob': 'blob 20s ease-in-out infinite',
				'drift': 'drift 15s ease-in-out infinite',
				'slideRight': 'slideRight 8s ease-in-out infinite',
				'slideLeft': 'slideLeft 10s ease-in-out infinite',
				'glitch-main': 'glitch-main 0.3s ease-in-out infinite',
				'glitch-red': 'glitch-red 0.15s ease-in-out infinite',
				'glitch-blue': 'glitch-blue 0.2s ease-in-out infinite',
				'scan': 'scan 8s linear infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
