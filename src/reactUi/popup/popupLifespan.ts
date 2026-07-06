let popupStrings: string[] = [];
let popupIndex = 0;
let onPopupAdded: (() => void) | null = null;

export function setPopupAddedListener(listener: (() => void) | null) {
    onPopupAdded = listener;
}

export function addPopup(popupText: string) {
    popupStrings.push(popupText);
    onPopupAdded?.();
}

export function peekNextPopup(): string | null {
    if (popupIndex >= popupStrings.length) {
        return null;
    }
    return popupStrings[popupIndex] || null;
}

export function advancePopupQueue(): string | null {
    const nextPopup = peekNextPopup();
    if (nextPopup !== null) {
        popupIndex += 1;
    }
    return nextPopup;
}