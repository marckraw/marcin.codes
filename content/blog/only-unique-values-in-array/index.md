---
title: Tylko unikatowe wartości w tablicy
date: "2020-01-02T11:45:00"
description: "Tylko unikatowe wartości w tablicy..."
---

## Witajcie w nowym roku!

Czas na pierwszy bardzo lakoniczny wpis o tym w jaki sposób pozbyć się powtórzonych elementów w tablicy.

Uzywa się do tego `new Set()`.

Najpierw tworzymy tablice z róznymi wartościami. Tworzymy z niej zbiór (`new Set()`). Zbiór w JS ma to do siebie, ze kazda z tych samych wartości pojawi się pojedynczo w zbiorze.

Następnie ze zbioru tworzymy tablice poprzez wykrzystanie `spread` (`...`) operatora. Mozemy go uzyc poniewaz `Set` implementuje interfejs `Iterable`.

```javascript
const arrayWithRepeatedValues = [1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 4, 5, 6, 7, 8, 9]
const setWithUniqueValues = new Set(arrayWithRepeatedValues)
const arrayWithUniqueValues = [...setWithUniqueValues]

// arrayWithUniqueValues = [1, 2, 3, 4, 5, 6, 7, 8, 9]
```

W tym przypadku `arrayWithUniqueValues` będzie posiadalo tylko unikatowe wartości.
