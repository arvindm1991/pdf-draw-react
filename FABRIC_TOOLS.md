# Adding More Tools to Fabric.js Canvas

This document provides instructions on how to expand the current drawing application with additional tools using Fabric.js.

## 1. Select Tool (Object Interaction)
To allow users to select, move, and scale objects, you need to disable drawing mode and ensure objects are selectable.

```javascript
// Disable drawing mode to allow selection
canvas.isDrawingMode = false;

// Ensure objects are selectable (default is true)
canvas.selection = true;
canvas.forEachObject(obj => {
  obj.selectable = true;
  obj.evented = true;
});
```

## 2. Highlighter Tool
A highlighter is essentially a semi-transparent free-drawing brush. You can achieve this by changing the global composite operation or simply using an RGBA color.

```javascript
// Enable drawing mode
canvas.isDrawingMode = true;

// Set highlighter properties
canvas.freeDrawingBrush.color = 'rgba(255, 255, 0, 0.4)'; // Yellow with 40% opacity
canvas.freeDrawingBrush.width = 20; // Thicker for highlighting
```

Alternatively, for a more "natural" highlighter look:
```javascript
canvas.freeDrawingBrush.globalCompositeOperation = 'multiply';
```

## 3. Text Color Selector
To change the color of the drawing brush or selected text/objects:

```javascript
// For drawing brush
canvas.freeDrawingBrush.color = '#FF5733';

// For selected text object
const activeObject = canvas.getActiveObject();
if (activeObject && activeObject.type === 'i-text') {
  activeObject.set('fill', '#FF5733');
  canvas.requestRenderAll();
}
```

## 4. Eraser Tool
Fabric.js 5.0+ introduced an Eraser brush. 

```javascript
// Install @fabric/eraser if needed, or use the built-in one in newer versions
canvas.freeDrawingBrush = new fabric.EraserBrush(canvas);
canvas.freeDrawingBrush.width = 10;
canvas.isDrawingMode = true;
```

*Note: If EraserBrush is not available, you can implement a "delete" tool that removes the active object.*

```javascript
const deleteActiveObject = () => {
  const activeObjects = canvas.getActiveObjects();
  canvas.discardActiveObject();
  canvas.remove(...activeObjects);
  canvas.requestRenderAll();
};
```

## 5. Shape Tools (Rectangle/Circle)
To add a fixed shape:

```javascript
const addRect = () => {
  const rect = new fabric.Rect({
    left: 100,
    top: 100,
    fill: 'transparent',
    stroke: 'blue',
    strokeWidth: 2,
    width: 100,
    height: 100
  });
  canvas.add(rect);
  canvas.setActiveObject(rect);
};
```

For more details, refer to the [Fabric.js Documentation](http://fabricjs.com/docs/).
