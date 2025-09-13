# UI Component Library

This directory contains reusable UI components for the Aura mental health application. These components are designed to be simple, accessible, and consistent with the application's design system.

## Available Components

### Button

A versatile button component with various styles and sizes.

```jsx
import { Button } from '@/components/ui/button';

<Button>Default Button</Button>
<Button variant="secondary">Secondary Button</Button>
<Button variant="outline">Outline Button</Button>
<Button variant="gradient">Gradient Button</Button>
<Button size="sm">Small Button</Button>
<Button size="lg">Large Button</Button>
```

### Card

A container component for grouping related content.

```jsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <p>Card footer</p>
  </CardFooter>
</Card>
```

### Input

A text input component.

```jsx
import { Input } from '@/components/ui/input';

<Input placeholder="Enter text" />
<Input type="password" placeholder="Enter password" />
```

### Textarea

A multi-line text input component.

```jsx
import { Textarea } from '@/components/ui/textarea';

<Textarea placeholder="Enter long text" />
```

### Select

A dropdown select component.

```jsx
import { Select, SelectOption } from '@/components/ui/select';

<Select>
  <SelectOption value="option1">Option 1</SelectOption>
  <SelectOption value="option2">Option 2</SelectOption>
</Select>
```

### Badge

A small label component for status indicators or counts.

```jsx
import { Badge } from '@/components/ui/badge';

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="success">Success</Badge>
```

### Progress

A progress bar component.

```jsx
import { Progress } from '@/components/ui/progress';

<Progress value={50} />
<Progress value={75} max={100} showValue />
```

### Modal

A dialog component for displaying content in a layer above the page.

```jsx
import { Modal } from '@/components/ui/modal';
import { useState } from 'react';

function Example() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
        <p>Modal content</p>
      </Modal>
    </>
  );
}
```

### Toast

A notification component for displaying brief messages.

```jsx
import { useToast } from '@/components/ui/toast';

function Example() {
  const { addToast } = useToast();
  
  return (
    <Button onClick={() => {
      addToast({
        title: 'Success',
        description: 'Operation completed successfully',
        type: 'success',
      });
    }}>
      Show Toast
    </Button>
  );
}
```

### Spinner

A loading indicator component.

```jsx
import { Spinner } from '@/components/ui/spinner';

<Spinner />
<Spinner size="lg" />
<Spinner variant="secondary" />
```

## Usage Guidelines

- Import components directly from their respective files
- Use the provided variants and sizes for consistent styling
- Combine components to create more complex UI patterns
- Follow accessibility best practices when using these components