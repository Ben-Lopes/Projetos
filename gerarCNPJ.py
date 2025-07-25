# Função rápida apenas para gerar um valor de CNPJ válido para sistemas que validam
# os números que compõe o valor.

import random 

def calc_dv(nums, dv1=None):
    if dv1 is None:
        base = nums[:]
        pesos = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    else:
        base = nums[:] + [dv1]
        pesos = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    soma = sum([b * p for b, p in zip(base, pesos)])
    resto = soma % 11
    return 0 if resto < 2 else 11 - resto

def gerar_cnpj():
    n = 9
    n1 = random.randint(0, n-1)
    n2 = random.randint(0, n-1)
    n3 = random.randint(0, n-1)
    n4 = random.randint(0, n-1)
    n5 = random.randint(0, n-1)
    n6 = random.randint(0, n-1)
    n7 = random.randint(0, n-1)
    n8 = random.randint(0, n-1)
    n9 = 0
    n10 = 0
    n11 = 0
    n12 = 1

    nums = [n1, n2, n3, n4, n5, n6, n7, n8, n9, n10, n11, n12]
    d1 = calc_dv(nums)
    d2 = calc_dv(nums, d1)

    cnpj = f"{n1}{n2}.{n3}{n4}{n5}.{n6}{n7}{n8}/{n9}{n10}{n11}{n12}-{d1}{d2}"
    return cnpj

if __name__ == "__main__":
    print(gerar_cnpj())