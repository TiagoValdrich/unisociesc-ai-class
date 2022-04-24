import numpy as np
import skfuzzy as fuzz
from skfuzzy import control as ctrl
import matplotlib.pyplot as plt


fuzz_pend = ctrl.Antecedent(np.arange(-1, 1.1, 0.1), 'pend')
fuzz_motor = ctrl.Consequent(np.arange(-300, 300, 1), 'motor')
fuzz_pend.automf(7)
fuzz_motor.automf(7)

fuzz_pend['average'].view()
fuzz_motor['average'].view()


rule1 = ctrl.Rule(fuzz_pend['dismal'], fuzz_motor['dismal'])
rule2 = ctrl.Rule(fuzz_pend['poor'], fuzz_motor['poor'])
rule3 = ctrl.Rule(fuzz_pend['mediocre'], fuzz_motor['mediocre'])
rule4 = ctrl.Rule(fuzz_pend['average'], fuzz_motor['average'])
rule5 = ctrl.Rule(fuzz_pend['decent'], fuzz_motor['decent'])
rule6 = ctrl.Rule(fuzz_pend['good'], fuzz_motor['good'])
rule7 = ctrl.Rule(fuzz_pend['excellent'], fuzz_motor['excellent'])

pendulum_ctrl = ctrl.ControlSystem([rule1, rule2, rule3, rule4, rule5, rule6, rule7])
pendulum_fuzz = ctrl.ControlSystemSimulation(pendulum_ctrl)

pendulum_fuzz.input['pend'] = -1.0
#pendulum_fuzz.input['motor'] = 9.8

pendulum_fuzz.compute()

fuzz_motor.view(pendulum_fuzz)