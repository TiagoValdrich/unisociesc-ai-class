import numpy as np
import skfuzzy as fuzz
import matplotlib.pyplot as plt

FP = np.arange(-0.15, 0.15, 0.001)
FPV = np.arange(-0.15, 0.15, 0.001)
Force = np.arange(-200, 200, 1)


FP_N = fuzz.trapmf(FPV, [-0.15, -0.150, -0.10, 0])
FP_Z = fuzz.trapmf(FPV, [-0.1, -0.03, 0.03, 0.1])
FP_P = fuzz.trapmf(FPV, [0, 0.1, 0.15, 0.150])


FPV_N = fuzz.trapmf(FPV, [-0.15, -0.150, -0.10, 0])
FPV_Z = fuzz.trapmf(FPV, [-0.15, -0.03, 0.03, 0.15])
FPV_P = fuzz.trapmf(FPV, [0, 0.1, 0.15, 0.150])

Force_NL = fuzz.trimf(Force, [-200, -100, 0])
Force_NM = fuzz.trimf(Force, [-80, -40, 0])
Force_NS = fuzz.trimf(Force, [-10, -5, 0])
Force_Z = fuzz.trimf(Force, [-0, 0, +0])
Force_PS = fuzz.trimf(Force, [0, 5, 10])
Force_PM = fuzz.trimf(Force, [0, 40, 80])
Force_PL = fuzz.trimf(Force, [0, 100, 200])

fig, (ax0) = plt.subplots(nrows=1, figsize=(6, 5))
fig, (ax1) = plt.subplots(nrows=1, figsize=(6, 5))
fig, (ax2) = plt.subplots(nrows=1, figsize=(6, 5))

ax0.plot(FP, FP_P, 'r', linewidth=1.5, label='P')
ax0.plot(FP, FP_Z, 'b', linewidth=1.5, label='Z')
ax0.plot(FP, FP_N, 'g', linewidth=1.5, label='N')
ax0.set_title('Função de pertinência')
ax0.legend()

ax1.plot(FPV, FPV_P, 'r', linewidth=1.5, label='P')
ax1.plot(FPV, FPV_Z, 'b', linewidth=1.5, label='Z')
ax1.plot(FPV, FPV_N, 'g', linewidth=1.5, label='N')
ax1.set_title('FP da velocidade angular')
ax1.legend()

ax2.plot(Force, Force_NL, 'r', linewidth=1.5, label='NL')
ax2.plot(Force, Force_NM, 'b', linewidth=1.5, label='NM')
ax2.plot(Force, Force_NS, 'g', linewidth=1.5, label='NS')
ax2.plot(Force, Force_Z, 'b', linewidth=1.5, label='Z')
ax2.plot(Force, Force_PS, 'g', linewidth=1.5, label='PS')
ax2.plot(Force, Force_PM, 'y', linewidth=1.5, label='PM')
ax2.plot(Force, Force_PL, 'r', linewidth=1.5, label='PL')
ax2.set_title('Force')
ax2.legend()


for ax in (ax0, ax1, ax2):
    ax.spines['top'].set_visible(False)
    ax.spines['right'].set_visible(False)
    ax.get_xaxis().tick_bottom()
    ax.get_yaxis().tick_left()

plt.tight_layout()
plt.show()


rule1 = fuzz.interp_membership(FP_N, FPV_N, Force_NL)
rule2 = fuzz.interp_membership(FP_N, FPV_Z, Force_NM)
rule3 = fuzz.interp_membership(FP_N, FPV_P, Force_Z)
rule4 = fuzz.interp_membership(FP_Z, FPV_N, Force_NL)
rule5 = fuzz.interp_membership(FP_Z, FPV_Z, Force_Z)
rule6 = fuzz.interp_membership(FP_Z, FPV_P, Force_PL)
rule7 = fuzz.interp_membership(FP_P, FPV_N, Force_Z)
rule8 = fuzz.interp_membership(FP_P, FPV_Z, Force_PM)
rule9 = fuzz.interp_membership(FP_P, FPV_P, Force_PL)

