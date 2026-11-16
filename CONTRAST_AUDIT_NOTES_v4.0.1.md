# Contrast audit notes – v4.0.1

The key issue in the supplied match-screen capture was dark muted metadata being reused on a dark navy score panel, plus disabled speed buttons being dimmed by opacity. The patch uses pale text on dark surfaces and high-contrast pale controls for disabled states.

Measured foreground/background ratios (WCAG calculation):
- score white on score navy: **17.13:1**
- home/away label pale on score navy: **12.89:1**
- tempo label pale on classic blue: **7.37:1**
- disabled control text on pale grey: **4.71:1**
- clock pale green on classic blue: **6.87:1**

For ordinary text, 4.5:1 is the usual WCAG AA target. For large text and meaningful non-text controls, 3:1 is the usual minimum.
