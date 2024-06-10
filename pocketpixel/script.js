document.addEventListener('DOMContentLoaded', () => {
    const palette = document.getElementById('palette');
    const grid = document.getElementById('grid');
    const resetButton = document.getElementById('reset');
    const saveButton = document.getElementById('save');
    const colorPicker = document.getElementById('colorPicker');
    let selectedColor = '#FFADAD';
    let isDrawing = false;

    // Create grid
    for (let i = 0; i < 256; i++) {
        const pixel = document.createElement('div');
        pixel.classList.add('pixel');
        pixel.addEventListener('mousedown', () => {
            isDrawing = true;
            pixel.style.backgroundColor = selectedColor
            ;
        });
        pixel.addEventListener('mouseover', () => {
            if (isDrawing) {
                pixel.style.backgroundColor = selectedColor;
            }
        });
        pixel.addEventListener('mouseup', () => {
            isDrawing = false;
        });
        grid.appendChild(pixel);
    }

    // Handle mouseup event outside of grid
    document.addEventListener('mouseup', () => {
        isDrawing = false;
    });

    // Palette color selection
    palette.addEventListener('click', (e) => {
        if (e.target.classList.contains('color')) {
            selectedColor = e.target.getAttribute('data-color');
            document.querySelectorAll('.color').forEach(color => {
                color.style.border = '1px solid gray';
            });
            e.target.style.border = '2px solid #000';
        }
    });

    // Hex color input
    colorPicker.addEventListener('input', (e) => {
        const color = e.target.value;
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            selectedColor = color;
        }
    });

    // Reset button
    resetButton.addEventListener('click', () => {
        document.querySelectorAll('.pixel').forEach(pixel => {
            pixel.style.backgroundColor = '#fff';
        });
    });

    // Save button
    saveButton.addEventListener('click', () => {
        html2canvas(grid).then(canvas => {
            const link = document.createElement('a');
            link.download = 'pixel-art.png';
            link.href = canvas.toDataURL();
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    });
});
